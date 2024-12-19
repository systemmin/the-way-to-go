<template><div><h1 id="_15-1-tcp-服务器" tabindex="-1"><a class="header-anchor" href="#_15-1-tcp-服务器"><span>15.1 tcp 服务器</span></a></h1>
<p>这部分我们将使用 TCP 协议和在 14 章讲到的协程范式编写一个简单的客户端-服务器应用，一个 (web) 服务器应用需要响应众多客户端的并发请求：Go 会为每一个客户端产生一个协程用来处理请求。我们需要使用 net 包中网络通信的功能。它包含了处理 TCP/IP 以及 UDP 协议、域名解析等方法。</p>
<p>服务器端代码是一个单独的文件：</p>
<p>示例 15.1 <a href="examples/chapter_15/server.go">server.go</a></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">	<span class="token string">"fmt"</span></span>
<span class="line">	<span class="token string">"net"</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Starting the server ..."</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token comment">// 创建 listener</span></span>
<span class="line">	listener<span class="token punctuation">,</span> err <span class="token operator">:=</span> net<span class="token punctuation">.</span><span class="token function">Listen</span><span class="token punctuation">(</span><span class="token string">"tcp"</span><span class="token punctuation">,</span> <span class="token string">"localhost:50000"</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Error listening"</span><span class="token punctuation">,</span> err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">		<span class="token keyword">return</span> <span class="token comment">//终止程序</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line">	<span class="token comment">// 监听并接受来自客户端的连接</span></span>
<span class="line">	<span class="token keyword">for</span> <span class="token punctuation">{</span></span>
<span class="line">		conn<span class="token punctuation">,</span> err <span class="token operator">:=</span> listener<span class="token punctuation">.</span><span class="token function">Accept</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Error accepting"</span><span class="token punctuation">,</span> err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">			<span class="token keyword">return</span> <span class="token comment">// 终止程序</span></span>
<span class="line">		<span class="token punctuation">}</span></span>
<span class="line">		<span class="token keyword">go</span> <span class="token function">doServerStuff</span><span class="token punctuation">(</span>conn<span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">doServerStuff</span><span class="token punctuation">(</span>conn net<span class="token punctuation">.</span>Conn<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">for</span> <span class="token punctuation">{</span></span>
<span class="line">		buf <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> <span class="token number">512</span><span class="token punctuation">)</span></span>
<span class="line">		<span class="token builtin">len</span><span class="token punctuation">,</span> err <span class="token operator">:=</span> conn<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span>buf<span class="token punctuation">)</span></span>
<span class="line">		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Error reading"</span><span class="token punctuation">,</span> err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">			<span class="token keyword">return</span> <span class="token comment">//终止程序</span></span>
<span class="line">		<span class="token punctuation">}</span></span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Received data: %v"</span><span class="token punctuation">,</span> <span class="token function">string</span><span class="token punctuation">(</span>buf<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token builtin">len</span><span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 <code v-pre>main()</code> 中创建了一个 <code v-pre>net.Listener</code> 类型的变量 <code v-pre>listener</code>，他实现了服务器的基本功能：用来监听和接收来自客户端的请求（基于 TCP 协议下，位于 IP 地址为 127.0.0.1、端口为 50000 的 localhost）。<code v-pre>Listen()</code> 函数可以返回一个 <code v-pre>error</code> 类型的错误变量。用一个无限 <code v-pre>for</code> 循环的 <code v-pre>listener.Accept()</code> 来等待客户端的请求。客户端的请求将产生一个 <code v-pre>net.Conn</code> 类型的连接变量。然后一个独立的协程使用这个连接执行 <code v-pre>doServerStuff()</code>，开始使用一个 512 字节的缓冲 <code v-pre>data</code> 来读取客户端发送来的数据，并且把它们打印到服务器的终端，<code v-pre>len()</code> 获取客户端发送的数据字节数；当客户端发送的所有数据都被读取完成时，协程就结束了。这段程序会为每一个客户端连接创建一个独立的协程。必须先运行服务器代码，再运行客户端代码。</p>
<p>客户端代码写在另一个文件 client.go 中：</p>
<p>示例 15.2 <a href="examples/chapter_15/client.go">client.go</a></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">	<span class="token string">"bufio"</span></span>
<span class="line">	<span class="token string">"fmt"</span></span>
<span class="line">	<span class="token string">"net"</span></span>
<span class="line">	<span class="token string">"os"</span></span>
<span class="line">	<span class="token string">"strings"</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token comment">//打开连接:</span></span>
<span class="line">	conn<span class="token punctuation">,</span> err <span class="token operator">:=</span> net<span class="token punctuation">.</span><span class="token function">Dial</span><span class="token punctuation">(</span><span class="token string">"tcp"</span><span class="token punctuation">,</span> <span class="token string">"localhost:50000"</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">		<span class="token comment">//由于目标计算机积极拒绝而无法创建连接</span></span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Error dialing"</span><span class="token punctuation">,</span> err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">		<span class="token keyword">return</span> <span class="token comment">// 终止程序</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">	inputReader <span class="token operator">:=</span> bufio<span class="token punctuation">.</span><span class="token function">NewReader</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Stdin<span class="token punctuation">)</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"First, what is your name?"</span><span class="token punctuation">)</span></span>
<span class="line">	clientName<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> inputReader<span class="token punctuation">.</span><span class="token function">ReadString</span><span class="token punctuation">(</span><span class="token char">'\n'</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token comment">// fmt.Printf("CLIENTNAME %s", clientName)</span></span>
<span class="line">	trimmedClient <span class="token operator">:=</span> strings<span class="token punctuation">.</span><span class="token function">Trim</span><span class="token punctuation">(</span>clientName<span class="token punctuation">,</span> <span class="token string">"\r\n"</span><span class="token punctuation">)</span> <span class="token comment">// Windows 平台下用 "\r\n"，Linux平台下使用 "\n"</span></span>
<span class="line">	<span class="token comment">// 给服务器发送信息直到程序退出：</span></span>
<span class="line">	<span class="token keyword">for</span> <span class="token punctuation">{</span></span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"What to send to the server? Type Q to quit."</span><span class="token punctuation">)</span></span>
<span class="line">		input<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> inputReader<span class="token punctuation">.</span><span class="token function">ReadString</span><span class="token punctuation">(</span><span class="token char">'\n'</span><span class="token punctuation">)</span></span>
<span class="line">		trimmedInput <span class="token operator">:=</span> strings<span class="token punctuation">.</span><span class="token function">Trim</span><span class="token punctuation">(</span>input<span class="token punctuation">,</span> <span class="token string">"\r\n"</span><span class="token punctuation">)</span></span>
<span class="line">		<span class="token comment">// fmt.Printf("input:--%s--", input)</span></span>
<span class="line">		<span class="token comment">// fmt.Printf("trimmedInput:--%s--", trimmedInput)</span></span>
<span class="line">		<span class="token keyword">if</span> trimmedInput <span class="token operator">==</span> <span class="token string">"Q"</span> <span class="token punctuation">{</span></span>
<span class="line">			<span class="token keyword">return</span></span>
<span class="line">		<span class="token punctuation">}</span></span>
<span class="line">		<span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">=</span> conn<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span>trimmedClient <span class="token operator">+</span> <span class="token string">" says: "</span> <span class="token operator">+</span> trimmedInput<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>客户端通过 <code v-pre>net.Dial()</code> 创建了一个和服务器之间的连接。</p>
<p>它通过无限循环从 <code v-pre>os.Stdin</code> 接收来自键盘的输入，直到输入了“Q”。注意裁剪 <code v-pre>\r</code> 和 <code v-pre>\n</code> 字符（仅 Windows 平台需要）。裁剪后的输入被 <code v-pre>connection</code> 的 <code v-pre>Write()</code> 方法发送到服务器。</p>
<p>当然，服务器必须先启动好，如果服务器并未开始监听，客户端是无法成功连接的。</p>
<p>如果在服务器没有开始监听的情况下运行客户端程序，客户端会停止并打印出以下错误信息：</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">dial tcp [::1]:xxxx: connectex: No connection could be made because the target machine actively refused it.</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>打开命令提示符并转到服务器和客户端代码所在的目录，输入 <code v-pre>go run server.go</code>，接下来控制台出现以下信息：<code v-pre>Starting the server ...</code></p>
<p>在 Windows 系统中，我们可以通过 CTRL+C 停止程序。</p>
<p>然后开启 2 个或者 3 个独立的控制台窗口，分别启动客户端程序</p>
<p>以下是服务器的输出：</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">Starting the Server ...</span>
<span class="line">Received data: IVO says: Hi Server, what's up ?</span>
<span class="line">Received data: CHRIS says: Are you busy server ?</span>
<span class="line">Received data: MARC says: Don't forget our appointment tomorrow !</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>当客户端输入“Q”并结束程序时，服务器会输出以下信息：</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">Error reading WSARecv tcp 127.0.0.1:50000: The specified network name is no longer available.</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>在网络编程中 <code v-pre>net.Dial()</code> 函数是非常重要的，一旦你连接到远程系统，函数就会返回一个 <code v-pre>Conn</code> 类型的接口，我们可以用它发送和接收数据。<code v-pre>Dial()</code> 函数简洁地抽象了网络层和传输层。所以不管是 IPv4 还是 IPv6，TCP 或者 UDP 都可以使用这个公用接口。</p>
<p>以下示例先使用 TCP 协议连接远程 80 端口，然后使用 UDP 协议连接，最后使用 TCP 协议连接 IPv6 地址：</p>
<p>示例 15.3 <a href="examples/chapter_15/dial.go">dial.go</a></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token comment">// make a connection with www.example.org:</span></span>
<span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">	<span class="token string">"fmt"</span></span>
<span class="line">	<span class="token string">"net"</span></span>
<span class="line">	<span class="token string">"os"</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	conn<span class="token punctuation">,</span> err <span class="token operator">:=</span> net<span class="token punctuation">.</span><span class="token function">Dial</span><span class="token punctuation">(</span><span class="token string">"tcp"</span><span class="token punctuation">,</span> <span class="token string">"192.0.32.10:80"</span><span class="token punctuation">)</span> <span class="token comment">// tcp ipv4</span></span>
<span class="line">	<span class="token function">checkConnection</span><span class="token punctuation">(</span>conn<span class="token punctuation">,</span> err<span class="token punctuation">)</span></span>
<span class="line">	conn<span class="token punctuation">,</span> err <span class="token operator">=</span> net<span class="token punctuation">.</span><span class="token function">Dial</span><span class="token punctuation">(</span><span class="token string">"udp"</span><span class="token punctuation">,</span> <span class="token string">"192.0.32.10:80"</span><span class="token punctuation">)</span> <span class="token comment">// udp</span></span>
<span class="line">	<span class="token function">checkConnection</span><span class="token punctuation">(</span>conn<span class="token punctuation">,</span> err<span class="token punctuation">)</span></span>
<span class="line">	conn<span class="token punctuation">,</span> err <span class="token operator">=</span> net<span class="token punctuation">.</span><span class="token function">Dial</span><span class="token punctuation">(</span><span class="token string">"tcp"</span><span class="token punctuation">,</span> <span class="token string">"[2620:0:2d0:200::10]:80"</span><span class="token punctuation">)</span> <span class="token comment">// tcp ipv6</span></span>
<span class="line">	<span class="token function">checkConnection</span><span class="token punctuation">(</span>conn<span class="token punctuation">,</span> err<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">checkConnection</span><span class="token punctuation">(</span>conn net<span class="token punctuation">.</span>Conn<span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"error %v connecting!"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span></span>
<span class="line">		os<span class="token punctuation">.</span><span class="token function">Exit</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line">	fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"Connection is made with %v\n"</span><span class="token punctuation">,</span> conn<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>下边也是一个使用 <code v-pre>net</code> 包从 socket 中打开，写入，读取数据的例子：</p>
<p>示例 15.4 <a href="examples/chapter_15/socket.go">socket.go</a></p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">	<span class="token string">"fmt"</span></span>
<span class="line">	<span class="token string">"io"</span></span>
<span class="line">	<span class="token string">"net"</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">var</span> <span class="token punctuation">(</span></span>
<span class="line">		host          <span class="token operator">=</span> <span class="token string">"www.apache.org"</span></span>
<span class="line">		port          <span class="token operator">=</span> <span class="token string">"80"</span></span>
<span class="line">		remote        <span class="token operator">=</span> host <span class="token operator">+</span> <span class="token string">":"</span> <span class="token operator">+</span> port</span>
<span class="line">		msg    <span class="token builtin">string</span> <span class="token operator">=</span> <span class="token string">"GET / \n"</span></span>
<span class="line">		data          <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">uint8</span><span class="token punctuation">,</span> <span class="token number">4096</span><span class="token punctuation">)</span></span>
<span class="line">		read          <span class="token operator">=</span> <span class="token boolean">true</span></span>
<span class="line">		count         <span class="token operator">=</span> <span class="token number">0</span></span>
<span class="line">	<span class="token punctuation">)</span></span>
<span class="line">	<span class="token comment">// 创建一个 socket</span></span>
<span class="line">	con<span class="token punctuation">,</span> err <span class="token operator">:=</span> net<span class="token punctuation">.</span><span class="token function">Dial</span><span class="token punctuation">(</span><span class="token string">"tcp"</span><span class="token punctuation">,</span> remote<span class="token punctuation">)</span></span>
<span class="line">	<span class="token comment">// 发送我们的消息，一个 http GET 请求</span></span>
<span class="line">	io<span class="token punctuation">.</span><span class="token function">WriteString</span><span class="token punctuation">(</span>con<span class="token punctuation">,</span> msg<span class="token punctuation">)</span></span>
<span class="line">	<span class="token comment">// 读取服务器的响应</span></span>
<span class="line">	<span class="token keyword">for</span> read <span class="token punctuation">{</span></span>
<span class="line">		count<span class="token punctuation">,</span> err <span class="token operator">=</span> con<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span></span>
<span class="line">		read <span class="token operator">=</span> <span class="token punctuation">(</span>err <span class="token operator">==</span> <span class="token boolean">nil</span><span class="token punctuation">)</span></span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token function">string</span><span class="token punctuation">(</span>data<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">:</span>count<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line">	con<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>练习 15.1</strong></p>
<p>编写新版本的客户端和服务器 (<a href="exercises/chapter_15/client1.go">client1.go</a> / <a href="exercises/chapter_15/server1.go">server1.go</a>)：</p>
<ul>
<li>增加一个检查错误的函数 <code v-pre>checkError(error)</code>；讨论如下方案的利弊：为什么这个重构可能并没有那么理想？看看在 <a href="examples/chapter_15/template_validation.go">示例 15.14</a> 中它是如何被解决的</li>
<li>使客户端可以通过发送一条命令 SH 来关闭服务器</li>
<li>让服务器可以保存已经连接的客户端列表（他们的名字）；当客户端发送 <code v-pre>WHO</code> 指令的时候，服务器将显示如下列表：</li>
</ul>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">This is the client list: 1:active, 0=inactive</span>
<span class="line">User IVO is 1</span>
<span class="line">User MARC is 1</span>
<span class="line">User CHRIS is 1</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>注意：当服务器运行的时候，你无法编译/连接同一个目录下的源码来产生一个新的版本，因为 <code v-pre>server.exe</code> 正在被操作系统使用而无法被替换成新的版本。</p>
<p>下边这个版本的 simple_tcp_server.go 从很多方面优化了第一个 tcp 服务器的示例 server.go 并且拥有更好的结构，它只用了 80 行代码！</p>
<p>示例 15.5 <a href="examples/chapter_15/simple_tcp_server.go">simple_tcp_server.go</a>：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token comment">// Simple multi-thread/multi-core TCP server.</span></span>
<span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">	<span class="token string">"flag"</span></span>
<span class="line">	<span class="token string">"fmt"</span></span>
<span class="line">	<span class="token string">"net"</span></span>
<span class="line">	<span class="token string">"os"</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> maxRead <span class="token operator">=</span> <span class="token number">25</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	flag<span class="token punctuation">.</span><span class="token function">Parse</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">if</span> flag<span class="token punctuation">.</span><span class="token function">NArg</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">2</span> <span class="token punctuation">{</span></span>
<span class="line">		<span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">"usage: host port"</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line">	hostAndPort <span class="token operator">:=</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">"%s:%s"</span><span class="token punctuation">,</span> flag<span class="token punctuation">.</span><span class="token function">Arg</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">,</span> flag<span class="token punctuation">.</span><span class="token function">Arg</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">	listener <span class="token operator">:=</span> <span class="token function">initServer</span><span class="token punctuation">(</span>hostAndPort<span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">for</span> <span class="token punctuation">{</span></span>
<span class="line">		conn<span class="token punctuation">,</span> err <span class="token operator">:=</span> listener<span class="token punctuation">.</span><span class="token function">Accept</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">		<span class="token function">checkError</span><span class="token punctuation">(</span>err<span class="token punctuation">,</span> <span class="token string">"Accept: "</span><span class="token punctuation">)</span></span>
<span class="line">		<span class="token keyword">go</span> <span class="token function">connectionHandler</span><span class="token punctuation">(</span>conn<span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">initServer</span><span class="token punctuation">(</span>hostAndPort <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token operator">*</span>net<span class="token punctuation">.</span>TCPListener <span class="token punctuation">{</span></span>
<span class="line">	serverAddr<span class="token punctuation">,</span> err <span class="token operator">:=</span> net<span class="token punctuation">.</span><span class="token function">ResolveTCPAddr</span><span class="token punctuation">(</span><span class="token string">"tcp"</span><span class="token punctuation">,</span> hostAndPort<span class="token punctuation">)</span></span>
<span class="line">	<span class="token function">checkError</span><span class="token punctuation">(</span>err<span class="token punctuation">,</span> <span class="token string">"Resolving address:port failed: '"</span><span class="token operator">+</span>hostAndPort<span class="token operator">+</span><span class="token string">"'"</span><span class="token punctuation">)</span></span>
<span class="line">	listener<span class="token punctuation">,</span> err <span class="token operator">:=</span> net<span class="token punctuation">.</span><span class="token function">ListenTCP</span><span class="token punctuation">(</span><span class="token string">"tcp"</span><span class="token punctuation">,</span> serverAddr<span class="token punctuation">)</span></span>
<span class="line">	<span class="token function">checkError</span><span class="token punctuation">(</span>err<span class="token punctuation">,</span> <span class="token string">"ListenTCP: "</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Listening to: "</span><span class="token punctuation">,</span> listener<span class="token punctuation">.</span><span class="token function">Addr</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">return</span> listener</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">connectionHandler</span><span class="token punctuation">(</span>conn net<span class="token punctuation">.</span>Conn<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	connFrom <span class="token operator">:=</span> conn<span class="token punctuation">.</span><span class="token function">RemoteAddr</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">String</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Connection from: "</span><span class="token punctuation">,</span> connFrom<span class="token punctuation">)</span></span>
<span class="line">	<span class="token function">sayHello</span><span class="token punctuation">(</span>conn<span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">for</span> <span class="token punctuation">{</span></span>
<span class="line">		<span class="token keyword">var</span> ibuf <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span> <span class="token operator">=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> maxRead<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">)</span></span>
<span class="line">		length<span class="token punctuation">,</span> err <span class="token operator">:=</span> conn<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span>ibuf<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">:</span>maxRead<span class="token punctuation">]</span><span class="token punctuation">)</span></span>
<span class="line">		ibuf<span class="token punctuation">[</span>maxRead<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">0</span> <span class="token comment">// to prevent overflow</span></span>
<span class="line">		<span class="token keyword">switch</span> err <span class="token punctuation">{</span></span>
<span class="line">		<span class="token keyword">case</span> <span class="token boolean">nil</span><span class="token punctuation">:</span></span>
<span class="line">			<span class="token function">handleMsg</span><span class="token punctuation">(</span>length<span class="token punctuation">,</span> err<span class="token punctuation">,</span> ibuf<span class="token punctuation">)</span></span>
<span class="line">		<span class="token keyword">case</span> os<span class="token punctuation">.</span>EAGAIN<span class="token punctuation">:</span> <span class="token comment">// try again</span></span>
<span class="line">			<span class="token keyword">continue</span></span>
<span class="line">		<span class="token keyword">default</span><span class="token punctuation">:</span></span>
<span class="line">			<span class="token keyword">goto</span> DISCONNECT</span>
<span class="line">		<span class="token punctuation">}</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line">DISCONNECT<span class="token punctuation">:</span></span>
<span class="line">	err <span class="token operator">:=</span> conn<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Closed connection: "</span><span class="token punctuation">,</span> connFrom<span class="token punctuation">)</span></span>
<span class="line">	<span class="token function">checkError</span><span class="token punctuation">(</span>err<span class="token punctuation">,</span> <span class="token string">"Close: "</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">sayHello</span><span class="token punctuation">(</span>to net<span class="token punctuation">.</span>Conn<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	obuf <span class="token operator">:=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">{</span><span class="token char">'L'</span><span class="token punctuation">,</span> <span class="token char">'e'</span><span class="token punctuation">,</span> <span class="token char">'t'</span><span class="token punctuation">,</span> <span class="token char">'\''</span><span class="token punctuation">,</span> <span class="token char">'s'</span><span class="token punctuation">,</span> <span class="token char">' '</span><span class="token punctuation">,</span> <span class="token char">'G'</span><span class="token punctuation">,</span> <span class="token char">'O'</span><span class="token punctuation">,</span> <span class="token char">'!'</span><span class="token punctuation">,</span> <span class="token char">'\n'</span><span class="token punctuation">}</span></span>
<span class="line">	wrote<span class="token punctuation">,</span> err <span class="token operator">:=</span> to<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span>obuf<span class="token punctuation">)</span></span>
<span class="line">	<span class="token function">checkError</span><span class="token punctuation">(</span>err<span class="token punctuation">,</span> <span class="token string">"Write: wrote "</span><span class="token operator">+</span><span class="token function">string</span><span class="token punctuation">(</span>wrote<span class="token punctuation">)</span><span class="token operator">+</span><span class="token string">" bytes."</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">handleMsg</span><span class="token punctuation">(</span>length <span class="token builtin">int</span><span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">,</span> msg <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">if</span> length <span class="token operator">></span> <span class="token number">0</span> <span class="token punctuation">{</span></span>
<span class="line">		<span class="token function">print</span><span class="token punctuation">(</span><span class="token string">"&lt;"</span><span class="token punctuation">,</span> length<span class="token punctuation">,</span> <span class="token string">":"</span><span class="token punctuation">)</span></span>
<span class="line">		<span class="token keyword">for</span> i <span class="token operator">:=</span> <span class="token number">0</span><span class="token punctuation">;</span> <span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span></span>
<span class="line">			<span class="token keyword">if</span> msg<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">==</span> <span class="token number">0</span> <span class="token punctuation">{</span></span>
<span class="line">				<span class="token keyword">break</span></span>
<span class="line">			<span class="token punctuation">}</span></span>
<span class="line">			fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%c"</span><span class="token punctuation">,</span> msg<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span></span>
<span class="line">		<span class="token punctuation">}</span></span>
<span class="line">		<span class="token function">print</span><span class="token punctuation">(</span><span class="token string">">"</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">checkError</span><span class="token punctuation">(</span><span class="token builtin">error</span> <span class="token builtin">error</span><span class="token punctuation">,</span> info <span class="token builtin">string</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token keyword">if</span> <span class="token builtin">error</span> <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">		<span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">"ERROR: "</span> <span class="token operator">+</span> info <span class="token operator">+</span> <span class="token string">" "</span> <span class="token operator">+</span> <span class="token builtin">error</span><span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token comment">// terminate program</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>（<strong>译者注：应该是由于 Go 版本的更新，会提示 os.EAGAIN undefined，修改后的代码：<a href="examples/chapter_15/simple_tcp_server_v1.go">simple_tcp_server_v1.go</a></strong>）</p>
<p>都有哪些改进？</p>
<ul>
<li>服务器地址和端口不再是硬编码，而是通过命令行参数传入，并通过 <code v-pre>flag</code> 包来读取这些参数。这里使用了 <code v-pre>flag.NArg()</code> 检查是否按照期望传入了 2 个参数：</li>
</ul>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">if</span> flag<span class="token punctuation">.</span><span class="token function">NArg</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">!=</span> <span class="token number">2</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token function">panic</span><span class="token punctuation">(</span><span class="token string">"usage: host port"</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>传入的参数通过 <code v-pre>fmt.Sprintf()</code> 函数格式化成字符串</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">hostAndPort <span class="token operator">:=</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span><span class="token string">"%s:%s"</span><span class="token punctuation">,</span> flag<span class="token punctuation">.</span><span class="token function">Arg</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">,</span> flag<span class="token punctuation">.</span><span class="token function">Arg</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><ul>
<li>在 <code v-pre>initServer()</code> 函数中通过 <code v-pre>net.ResolveTCPAddr()</code> 得到了服务器地址和端口，这个函数最终返回了一个 <code v-pre>*net.TCPListener</code></li>
<li>每一个连接都会以协程的方式运行 <code v-pre>connectionHandler()</code> 函数。函数首先通过 <code v-pre>conn.RemoteAddr()</code> 获取到客户端的地址并显示出来</li>
<li>它使用 <code v-pre>conn.Write()</code> 发送 Go 推广消息给客户端</li>
<li>它使用一个 25 字节的缓冲读取客户端发送的数据并一一打印出来。如果读取的过程中出现错误，代码会进入 <code v-pre>switch</code> 语句 <code v-pre>default</code> 分支，退出无限循环并关闭连接。如果是操作系统的 <code v-pre>EAGAIN</code> 错误，它会重试。</li>
<li>所有的错误检查都被重构在独立的函数 <code v-pre>checkError</code> 中，当错误产生时，利用错误上下文来触发 panic。</li>
</ul>
<p>在命令行中输入 <code v-pre>simple_tcp_server localhost 50000</code> 来启动服务器程序，然后在独立的命令行窗口启动一些 client.go 的客户端。当有两个客户端连接的情况下服务器的典型输出如下，这里我们可以看到每个客户端都有自己的地址：</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">E:\Go\GoBoek\code examples\chapter 14>simple_tcp_server localhost 50000</span>
<span class="line">Listening to: 127.0.0.1:50000</span>
<span class="line">Connection from: 127.0.0.1:49346</span>
<span class="line">&lt;25:Ivo says: Hi server, do y>&lt;12:ou hear me ?></span>
<span class="line">Connection from: 127.0.0.1:49347</span>
<span class="line">&lt;25:Marc says: Do you remembe>&lt;25:r our first meeting serve>&lt;2:r?></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>net.Error：</strong>
<code v-pre>net</code> 包返回的错误类型遵循惯例为 <code v-pre>error</code>，但有些错误实现包含额外的方法，他们被定义为 <code v-pre>net.Error</code> 接口：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> net</span>
<span class="line"></span>
<span class="line"><span class="token keyword">type</span> Error <span class="token keyword">interface</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token function">Timeout</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">bool</span> <span class="token comment">// 错误是否超时</span></span>
<span class="line">	<span class="token function">Temporary</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">bool</span> <span class="token comment">// 是否是临时错误</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通过类型断言，客户端代码可以测试 <code v-pre>net.Error</code>，从而区分是临时发生的还是必然会出现的错误。举例来说，一个网络爬虫程序在遇到临时发生的错误时可能会休眠或者重试，如果是一个必然发生的错误，则他会放弃继续执行。</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token comment">// in a loop - some function returns an error err</span></span>
<span class="line"><span class="token keyword">if</span> nerr<span class="token punctuation">,</span> ok <span class="token operator">:=</span> err<span class="token punctuation">.</span><span class="token punctuation">(</span>net<span class="token punctuation">.</span>Error<span class="token punctuation">)</span><span class="token punctuation">;</span> ok <span class="token operator">&amp;&amp;</span> nerr<span class="token punctuation">.</span><span class="token function">Temporary</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	time<span class="token punctuation">.</span><span class="token function">Sleep</span><span class="token punctuation">(</span><span class="token number">1e9</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">continue</span> <span class="token comment">// try again</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"><span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">	log<span class="token punctuation">.</span><span class="token function">Fatal</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接"><span>链接</span></a></h2>
<ul>
<li><RouteLink to="/chapter-3/directory.html">目录</RouteLink></li>
<li>上一节：<RouteLink to="/chapter-3/15.0.html">网络、模版与网页应用</RouteLink></li>
<li>下一节：<RouteLink to="/chapter-3/15.2.html">一个简单的网页服务器</RouteLink></li>
</ul>
</div></template>


