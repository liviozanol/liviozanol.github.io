---
#draft: true
slug: non-contiguous-netmasks
title: Non-contiguous Netmasks
authors: [livio]
tags: [network fundamentals, subnet, iptables, acl, routing, pf]
---

## Intro

A long time ago (2006), When I was still graduating in computer science, I’ve made a [video](https://www.youtube.com/watch?v=QsUlySdtqaw) showing the communication between 2 openBSD VMs configured with non-contiguous network masks (eg: 255.255.0.255 or 255.255.255.1) talking to each other.

At that time, I tried to use non-contiguous masks on Windows, Linux (Gentoo?), FreeBSD and OpenBSD. Only OpenBSD was able to make this kind of configuration.

Maybe having subnets with non-continuous masks aren't useful at all, but what about firewalls/filters? Having this possibility can be good and suppress some (many?) lines of rules depending on your scenario.

<!--truncate-->

The below video demonstrates a working environment using non-contiguous netmask on OpenBSD and also a working routing scenario between 2 subnets (one with EVEN IPs and one with ODDs IPs):
<iframe width="600" height="400"
src="https://www.youtube.com/embed/QsUlySdtqaw">
</iframe>

I've made this video after a conversation with some coleagues about general network fundamentals. At that time I was trying to figure out how to scan networks like this using NMAP and started a discussion at the mailing list (http://seclists.org/nmap-dev/2006/q4/50). Fortunately, nmap gives us some good options for this using wildcards. You can start a nmap scan with a range like `192.168.0-100.1` or `192.168.*.1` or even `192.168.0.1,3,5,7,9`.

## The fundamentals

Network calculations are based on [bitwise operations](https://en.wikipedia.org/wiki/Bitwise_operation), and so are IP/mask 5-tuples filters/rules. If you want to know if an IP address belongs to an IP/subnet you can do an "AND" binary comparison using this IP and the subnet and compare the result with the intended IP and the same subnet. If the results are equal, they belong to the same subnet. (eg.: 192.168.0.1 AND 255.255.255.0 = 192.168.0.0, so is 192.168.0.250 AND 255.255.255.0). If you want to read a more complete calculation explanation you can [read this post](https://www.prado.it/2016/05/21/.yet-another-post-about-ipv4-subnetting-non-contiguous-bits-version/)

Since everything is bit afterall, why couldn't we use non-contiguous netmasks? I don't know exactly the reason. [RFC 950](https://datatracker.ietf.org/doc/html/rfc950) doesn't specify it as mandatory and also includes an explanation on its appendix with a non-contiguous example, but this old RFC was already "overwritten" by new ones that clearly stated that netmask bit **must** b contiguous. Maybe they wanted network configuration to be easier to understand?

## Checking non-contiguous Subnet Mask configuration Today

I have made new tests on this subject, trying to configure an IP address with netmask 255.255.0.255 on some interface and the results are:
- FreeBSD 13.1: **Supported**! Didn't work in 2006.
- MAC OS: Didn't test.
- OpenBSD 7.1: **Supported**.
- Ubuntu 22.04: Not supported. (either using iproute2 or ifconfig)
- Windows 10: Not supported.


I have tried to figure out why iproute2 on Ubuntu didn't allow me to make this configuration by investigating the source code. I don't know much about C and coded very little in it, so I find it difficult to understand some of the iproute2 code (and kernel too). Well, using the error message displayed `Error: any valid prefix is expected rather than "192.168.0.1/255.255.0.255"`, I was able to identify that this error is returned by function [get_prefix_1](https://git.kernel.org/pub/scm/network/iproute2/iproute2.git/tree/lib/utils.c#n651), more specific, inside get_prefix_1, it detected the error with the function [get_netmask](https://git.kernel.org/pub/scm/network/iproute2/iproute2.git/tree/lib/utils.c#n164). Reading the code below, I can suggest (but can't be sure) that it tries to convert our dotted decimal mask to a CIDR and then returns an error.

```C {10,18} showLineNumbers
static int get_netmask(unsigned int *val, const char *arg, int base)
{
	inet_prefix addr;

	if (!get_unsigned(val, arg, base))
		return 0;

	/* try converting dotted quad to CIDR */
	if (!get_addr_1(&addr, arg, AF_INET) && addr.family == AF_INET) {
		int b = mask2bits(addr.data[0]);

		if (b >= 0) {
			*val = b;
			return 0;
		}
	}

	return -1;
}
```


## Packet filters and firewalls

Ok, on FreeBSD and OpenBSD we can configure non-contiguous masks, but It isn't very useful nowadays. But what about using it to filter packets on firewalls and ACLs? Well, in some scenarios it could be useful.

Imagine for example, you have a lot of remote WAN sites concentrating traffic on a central office on a typical hub-and-spoke topology and you have a well defined remote ip addressing police and every WAN site has a /24 subnet and a specific equipment (pbx/printer/proxy/router/whatever) is always the last IP. What if you want to allow traffic only from this IP from all sites on your central office, but block any other? In this case, on a typical implementation, you would have to create 1 /32 rule for each remote site.

Ex.:
```
permit ip 10.0.1.254/32 any
permit ip 10.0.2.254/32 any
permit ip 10.0.3.254/32 any
...
deny any any (implied)
```

If you could use non-contiguous netmask you could solve this problem with only one line, like:

```
permit ip 10.0.0.254/255.255.0.255 any
deny any any (implied)
```
Or using wildcard:

```
permit ip 10.0.0.254 0.0.255.0 any
deny any any (implied)
```


Do routers support this? What about firewalls? Tested some of them. These are the results (won't put specific OS versions):
- IOS: Supported.
- IOS XE: Supported.
- IOS XR: Supported.
- NX OS: Supported.
- Huawei VRP: Supported.
- Windows O.S. Firewall: **Not Supported**.
- IPtables: Supported.
- PF: Didn't test. [Documentation](https://man.openbsd.org/pf.conf) specify CIDR notation or ranges.


Nice! Almost every equipment/firewall supports it! So yes, you can use this to make a more intelligent filter, just don't forget that other people may be reading and managing the equipment/software with you, they must be notified about it, since reading this kind of configuration for the first time can be confusing.

Also, as a side note, since IPtables support this kind of rule, and docker and kubernetes relies on it, I think you could mock a sort of non-contiguous netmask configuration on it. But please, don't.

Another point to note is that [eBPF XDP](https://github.com/xdp-project/xdp-tutorial) has been rising as a solution for simple filters and firewalls. Being *very* basic on the definition, XDP lets you execute a user-built program for every packet that arrives on an interface so you can decide whatever you want to do with it. So for sure it can support non-contiguous masks. Maybe in the future, I can write more about XDP.