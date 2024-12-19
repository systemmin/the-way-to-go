<template><div><h1 id="_21-2-mroffice-一个使用-go-的呼叫中心网络电话-voip-系统" tabindex="-1"><a class="header-anchor" href="#_21-2-mroffice-一个使用-go-的呼叫中心网络电话-voip-系统"><span>21.2 MROffice：一个使用 Go 的呼叫中心网络电话 (VOIP) 系统</span></a></h1>
<p>http://mroffice.org/</p>
<p>这个例子表明，Go 也适用于简单、可靠的应用程序编程。</p>
<p>MROffice 是一家位于新西兰的公司，专门从事市场调查软件。他们在 Freeswitch 的基础上使用 Go 为市场调查的呼叫中心建立了一个电话解决方案。Kees Varekamp 是有市场研究软件的背景的一位开发人员，他发现该领域的大多数现有软件都很糟糕，于是在 2010 年推出了 MROffice，为市场研究行业提供更好的软件。</p>
<p>他的旗舰产品名为 <a href="http://mroffice.org/telephony.html" target="_blank" rel="noopener noreferrer">Dialer</a>。</p>
<p>Dialer 主要做什么？</p>
<ul>
<li>它把呼叫中心的面试官和受访者联系起来。</li>
<li>它在采访平台（提供脚本和收集统计数据）和 VoIP 拨号器（进行实际的电话通话）之间提供一座桥梁。</li>
</ul>
<p><u>为什么是 Go？</u></p>
<p>Dialer 的第一个版本是用 Python 写的，但他的经验是，Python 作为一种动态脚本语言，对于长期运行的服务器进程来说，也许不是一个好的选择：发生了很多运行时的错误，而这些错误本可以在编译时被发现。</p>
<p>正如 Varekamp 先生在悉尼 Go 用户组（2011 年 3 月）所说：</p>
<blockquote>
<p>“当 Go 出现的时候，我立刻就理解到了 (made sense to me)：类型安全，已编译，感觉像一种脚本语言。”</p>
</blockquote>
<p>所以他把 Python 代码移植到 Go 上。<em>Go 的并发模型</em>适合这个问题：一个 goroutine 被启动来处理每个呼叫、面试者和被面试者，他们都通过通道来进行通信。<code v-pre>http</code> 和 <code v-pre>websocket</code> 库使得编写一个用户管理界面变得容易。</p>
<p>该产品现在已经在多个呼叫中心运行，并且正在进行使用神经网络的预测拨号器设计。</p>
<ul>
<li><RouteLink to="/chapter-4/directory.html">目录</RouteLink></li>
<li>上一节：<RouteLink to="/chapter-4/21.1.html">Heroku：一个使用 Go 的高度可用一致数据存储</RouteLink></li>
<li>下一节：<RouteLink to="/chapter-4/21.3.html">Atlassian：一个虚拟机群管理系统</RouteLink></li>
</ul>
</div></template>


