<template><div><h1 id="_12-2-文件读写" tabindex="-1"><a class="header-anchor" href="#_12-2-文件读写"><span>12.2 文件读写</span></a></h1>
<h2 id="_12-2-1-读文件" tabindex="-1"><a class="header-anchor" href="#_12-2-1-读文件"><span>12.2.1 读文件</span></a></h2>
<p>在 Go 语言中，文件使用指向 <code v-pre>os.File</code> 类型的指针来表示的，也叫做文件句柄。我们在前面章节使用到过标准输入 <code v-pre>os.Stdin</code> 和标准输出 <code v-pre>os.Stdout</code>，他们的类型都是 <code v-pre>*os.File</code>。让我们来看看下面这个程序：</p>
<p>示例 12.4 <a href="examples/chapter_12/fileinput.go">fileinput.go</a>：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">    <span class="token string">"bufio"</span></span>
<span class="line">    <span class="token string">"fmt"</span></span>
<span class="line">    <span class="token string">"io"</span></span>
<span class="line">    <span class="token string">"os"</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    inputFile<span class="token punctuation">,</span> inputError <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span><span class="token string">"input.dat"</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">if</span> inputError <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">        fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"An error occurred on opening the inputfile\n"</span> <span class="token operator">+</span></span>
<span class="line">            <span class="token string">"Does the file exist?\n"</span> <span class="token operator">+</span></span>
<span class="line">            <span class="token string">"Have you got access to it?\n"</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token comment">// exit the function on error</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    <span class="token keyword">defer</span> inputFile<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    inputReader <span class="token operator">:=</span> bufio<span class="token punctuation">.</span><span class="token function">NewReader</span><span class="token punctuation">(</span>inputFile<span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">for</span> <span class="token punctuation">{</span></span>
<span class="line">        inputString<span class="token punctuation">,</span> readerError <span class="token operator">:=</span> inputReader<span class="token punctuation">.</span><span class="token function">ReadString</span><span class="token punctuation">(</span><span class="token char">'\n'</span><span class="token punctuation">)</span></span>
<span class="line">        fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"The input was: %s"</span><span class="token punctuation">,</span> inputString<span class="token punctuation">)</span></span>
<span class="line">        <span class="token keyword">if</span> readerError <span class="token operator">==</span> io<span class="token punctuation">.</span>EOF <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">return</span></span>
<span class="line">        <span class="token punctuation">}</span>      </span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>变量 <code v-pre>inputFile</code> 是 <code v-pre>*os.File</code> 类型的。该类型是一个结构，表示一个打开文件的描述符（文件句柄）。然后，使用 <code v-pre>os</code> 包里的 <code v-pre>Open()</code> 函数来打开一个文件。该函数的参数是文件名，类型为 <code v-pre>string</code>。在上面的程序中，我们以只读模式打开 <code v-pre>input.dat</code> 文件。</p>
<p>如果文件不存在或者程序没有足够的权限打开这个文件，Open函数会返回一个错误：<code v-pre>inputFile, inputError = os.Open(&quot;input.dat&quot;)</code>。如果文件打开正常，我们就使用 <code v-pre>defer inputFile.Close()</code> 语句确保在程序退出前关闭该文件。然后，我们使用 <code v-pre>bufio.NewReader()</code> 来获得一个读取器变量。</p>
<p>通过使用 <code v-pre>bufio</code> 包提供的读取器（写入器也类似），如上面程序所示，我们可以很方便的操作相对高层的 <code v-pre>string</code> 对象，而避免了去操作比较底层的字节。</p>
<p>接着，我们在一个无限循环中使用 <code v-pre>ReadString('\n')</code> 或 <code v-pre>ReadBytes('\n')</code> 将文件的内容逐行（行结束符 <code v-pre>'\n'</code>）读取出来。</p>
<p><strong>注意：</strong> 在之前的例子中，我们看到，Unix 和 Linux 的行结束符是 <code v-pre>\n</code>，而 Windows 的行结束符是 <code v-pre>\r\n</code>。在使用 <code v-pre>ReadString</code> 和 <code v-pre>ReadBytes</code> 方法的时候，我们不需要关心操作系统的类型，直接使用 <code v-pre>\n</code> 就可以了。另外，我们也可以使用 <code v-pre>ReadLine()</code> 方法来实现相同的功能。</p>
<p>一旦读取到文件末尾，变量 <code v-pre>readerError</code> 的值将变成非空（事实上，其值为常量 <code v-pre>io.EOF</code>），我们就会执行 <code v-pre>return</code> 语句从而退出循环。</p>
<p><strong>其他类似函数：</strong></p>
<p><strong>1) 将整个文件的内容读到一个字符串里：</strong></p>
<p>如果您想这么做，可以使用 <code v-pre>io/ioutil</code> 包里的 <code v-pre>ioutil.ReadFile()</code> 方法，该方法第一个返回值的类型是 <code v-pre>[]byte</code>，里面存放读取到的内容，第二个返回值是错误，如果没有错误发生，第二个返回值为 <code v-pre>nil</code>。请看示例 12.5。类似的，函数 <code v-pre>WriteFile()</code> 可以将 <code v-pre>[]byte</code> 的值写入文件。</p>
<p>示例 12.5 <a href="examples/chapter_12/read_write_file1.go">read_write_file1.go</a>：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">    <span class="token string">"fmt"</span></span>
<span class="line">    <span class="token string">"io/ioutil"</span></span>
<span class="line">    <span class="token string">"os"</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    inputFile <span class="token operator">:=</span> <span class="token string">"products.txt"</span></span>
<span class="line">    outputFile <span class="token operator">:=</span> <span class="token string">"products_copy.txt"</span></span>
<span class="line">    buf<span class="token punctuation">,</span> err <span class="token operator">:=</span> ioutil<span class="token punctuation">.</span><span class="token function">ReadFile</span><span class="token punctuation">(</span>inputFile<span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">        fmt<span class="token punctuation">.</span><span class="token function">Fprintf</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Stderr<span class="token punctuation">,</span> <span class="token string">"File Error: %s\n"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span></span>
<span class="line">        <span class="token comment">// panic(err.Error())</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"%s\n"</span><span class="token punctuation">,</span> <span class="token function">string</span><span class="token punctuation">(</span>buf<span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">    err <span class="token operator">=</span> ioutil<span class="token punctuation">.</span><span class="token function">WriteFile</span><span class="token punctuation">(</span>outputFile<span class="token punctuation">,</span> buf<span class="token punctuation">,</span> <span class="token number">0644</span><span class="token punctuation">)</span> <span class="token comment">// oct, not hex</span></span>
<span class="line">    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">.</span><span class="token function">Error</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>2) 带缓冲的读取</strong></p>
<p>在很多情况下，文件的内容是不按行划分的，或者干脆就是一个二进制文件。在这种情况下，<code v-pre>ReadString()</code> 就无法使用了，我们可以使用 <code v-pre>bufio.Reader</code> 的 <code v-pre>Read()</code>，它只接收一个参数：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">buf <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> <span class="token number">1024</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token operator">...</span></span>
<span class="line">n<span class="token punctuation">,</span> err <span class="token operator">:=</span> inputReader<span class="token punctuation">.</span><span class="token function">Read</span><span class="token punctuation">(</span>buf<span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">if</span> <span class="token punctuation">(</span>n <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token punctuation">{</span> <span class="token keyword">break</span><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>变量 <code v-pre>n</code> 的值表示读取到的字节数.</p>
<p><strong>3) 按列读取文件中的数据</strong></p>
<p>如果数据是按列排列并用空格分隔的，你可以使用 <code v-pre>fmt</code> 包提供的以 <code v-pre>FScan...</code> 开头的一系列函数来读取他们。请看以下程序，我们将 3 列的数据分别读入变量 <code v-pre>v1</code>、<code v-pre>v2</code> 和 <code v-pre>v3</code> 内，然后分别把他们添加到切片的尾部。</p>
<p>示例 12.6 <a href="examples/chapter_12/read_file2.go">read_file2.go</a>：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">    <span class="token string">"fmt"</span></span>
<span class="line">    <span class="token string">"os"</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    file<span class="token punctuation">,</span> err <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span><span class="token string">"products2.txt"</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token function">panic</span><span class="token punctuation">(</span>err<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    <span class="token keyword">defer</span> file<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">    <span class="token keyword">var</span> col1<span class="token punctuation">,</span> col2<span class="token punctuation">,</span> col3 <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span></span>
<span class="line">    <span class="token keyword">for</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">var</span> v1<span class="token punctuation">,</span> v2<span class="token punctuation">,</span> v3 <span class="token builtin">string</span></span>
<span class="line">        <span class="token boolean">_</span><span class="token punctuation">,</span> err <span class="token operator">:=</span> fmt<span class="token punctuation">.</span><span class="token function">Fscanln</span><span class="token punctuation">(</span>file<span class="token punctuation">,</span> <span class="token operator">&amp;</span>v1<span class="token punctuation">,</span> <span class="token operator">&amp;</span>v2<span class="token punctuation">,</span> <span class="token operator">&amp;</span>v3<span class="token punctuation">)</span></span>
<span class="line">        <span class="token comment">// scans until newline</span></span>
<span class="line">        <span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">            <span class="token keyword">break</span></span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">        col1 <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>col1<span class="token punctuation">,</span> v1<span class="token punctuation">)</span></span>
<span class="line">        col2 <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>col2<span class="token punctuation">,</span> v2<span class="token punctuation">)</span></span>
<span class="line">        col3 <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>col3<span class="token punctuation">,</span> v3<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>col1<span class="token punctuation">)</span></span>
<span class="line">    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>col2<span class="token punctuation">)</span></span>
<span class="line">    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>col3<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出结果：</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">[ABC FUNC GO]</span>
<span class="line">[40 56 45]</span>
<span class="line">[150 280 356]</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>注意：</strong> <code v-pre>path</code> 包里包含一个子包叫 <code v-pre>filepath</code>，这个子包提供了跨平台的函数，用于处理文件名和路径。例如 <code v-pre>Base()</code> 函数用于获得路径中的最后一个元素（不包含后面的分隔符）：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">import</span> <span class="token string">"path/filepath"</span></span>
<span class="line">filename <span class="token operator">:=</span> filepath<span class="token punctuation">.</span><span class="token function">Base</span><span class="token punctuation">(</span>path<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>练习 12.3</strong>：<a href="exercises/chapter_12/read_csv.go">read_csv.go</a></p>
<p>文件 products.txt 的内容如下：</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text" data-title="text"><pre v-pre><code><span class="line">"The ABC of Go";25.5;1500</span>
<span class="line">"Functional Programming with Go";56;280</span>
<span class="line">"Go for It";45.9;356</span>
<span class="line">"The Go Way";55;500</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>每行的第一个字段为标题，第二个字段为价格，第三个字段为数量。内容的格式基本与 示例 12.3c 的相同，除了分隔符改成了分号。请读取出文件的内容，创建一个结构用于存取一行的数据，然后使用结构的切片，并把数据打印出来。</p>
<p>关于解析 CSV 文件，<code v-pre>encoding/csv</code> 包提供了相应的功能。具体请参考 <a href="http://golang.org/pkg/encoding/csv/" target="_blank" rel="noopener noreferrer">http://golang.org/pkg/encoding/csv/</a> 。</p>
<h2 id="_12-2-2-compress-包-读取压缩文件" tabindex="-1"><a class="header-anchor" href="#_12-2-2-compress-包-读取压缩文件"><span>12.2.2 compress 包：读取压缩文件</span></a></h2>
<p><code v-pre>compress</code> 包提供了读取压缩文件的功能，支持的压缩文件格式为：bzip2、flate、gzip、lzw 和 zlib。</p>
<p>下面的程序展示了如何读取一个 gzip 文件。</p>
<p>示例 12.7 <a href="examples/chapter_12/gzipped.go">gzipped.go</a>：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">	<span class="token string">"fmt"</span></span>
<span class="line">	<span class="token string">"bufio"</span></span>
<span class="line">	<span class="token string">"os"</span></span>
<span class="line">	<span class="token string">"compress/gzip"</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	fName <span class="token operator">:=</span> <span class="token string">"MyFile.gz"</span></span>
<span class="line">	<span class="token keyword">var</span> r <span class="token operator">*</span>bufio<span class="token punctuation">.</span>Reader</span>
<span class="line">	fi<span class="token punctuation">,</span> err <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">Open</span><span class="token punctuation">(</span>fName<span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Fprintf</span><span class="token punctuation">(</span>os<span class="token punctuation">.</span>Stderr<span class="token punctuation">,</span> <span class="token string">"%v, Can't open %s: error: %s\n"</span><span class="token punctuation">,</span> os<span class="token punctuation">.</span>Args<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">,</span> fName<span class="token punctuation">,</span></span>
<span class="line">			err<span class="token punctuation">)</span></span>
<span class="line">		os<span class="token punctuation">.</span><span class="token function">Exit</span><span class="token punctuation">(</span><span class="token number">1</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line">	<span class="token keyword">defer</span> fi<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">	fz<span class="token punctuation">,</span> err <span class="token operator">:=</span> gzip<span class="token punctuation">.</span><span class="token function">NewReader</span><span class="token punctuation">(</span>fi<span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">		r <span class="token operator">=</span> bufio<span class="token punctuation">.</span><span class="token function">NewReader</span><span class="token punctuation">(</span>fi<span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">		r <span class="token operator">=</span> bufio<span class="token punctuation">.</span><span class="token function">NewReader</span><span class="token punctuation">(</span>fz<span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line">	<span class="token keyword">for</span> <span class="token punctuation">{</span></span>
<span class="line">		line<span class="token punctuation">,</span> err <span class="token operator">:=</span> r<span class="token punctuation">.</span><span class="token function">ReadString</span><span class="token punctuation">(</span><span class="token char">'\n'</span><span class="token punctuation">)</span></span>
<span class="line">		<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">			fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Done reading file"</span><span class="token punctuation">)</span></span>
<span class="line">			os<span class="token punctuation">.</span><span class="token function">Exit</span><span class="token punctuation">(</span><span class="token number">0</span><span class="token punctuation">)</span></span>
<span class="line">		<span class="token punctuation">}</span></span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>line<span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="_12-2-3-写文件" tabindex="-1"><a class="header-anchor" href="#_12-2-3-写文件"><span>12.2.3 写文件</span></a></h2>
<p>请看以下程序：</p>
<p>示例 12.8 <a href="examples/chapter_12/fileoutput.go">fileoutput.go</a>：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">	<span class="token string">"os"</span></span>
<span class="line">	<span class="token string">"bufio"</span></span>
<span class="line">	<span class="token string">"fmt"</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> main <span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	<span class="token comment">// var outputWriter *bufio.Writer</span></span>
<span class="line">	<span class="token comment">// var outputFile *os.File</span></span>
<span class="line">	<span class="token comment">// var outputError os.Error</span></span>
<span class="line">	<span class="token comment">// var outputString string</span></span>
<span class="line">	outputFile<span class="token punctuation">,</span> outputError <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">OpenFile</span><span class="token punctuation">(</span><span class="token string">"output.dat"</span><span class="token punctuation">,</span> os<span class="token punctuation">.</span>O_WRONLY<span class="token operator">|</span>os<span class="token punctuation">.</span>O_CREATE<span class="token punctuation">,</span> <span class="token number">0666</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">if</span> outputError <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span></span>
<span class="line">		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"An error occurred with file opening or creation\n"</span><span class="token punctuation">)</span></span>
<span class="line">		<span class="token keyword">return</span>  </span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line">	<span class="token keyword">defer</span> outputFile<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">	outputWriter <span class="token operator">:=</span> bufio<span class="token punctuation">.</span><span class="token function">NewWriter</span><span class="token punctuation">(</span>outputFile<span class="token punctuation">)</span></span>
<span class="line">	outputString <span class="token operator">:=</span> <span class="token string">"hello world!\n"</span></span>
<span class="line"></span>
<span class="line">	<span class="token keyword">for</span> i<span class="token operator">:=</span><span class="token number">0</span><span class="token punctuation">;</span> i<span class="token operator">&lt;</span><span class="token number">10</span><span class="token punctuation">;</span> i<span class="token operator">++</span> <span class="token punctuation">{</span></span>
<span class="line">		outputWriter<span class="token punctuation">.</span><span class="token function">WriteString</span><span class="token punctuation">(</span>outputString<span class="token punctuation">)</span></span>
<span class="line">	<span class="token punctuation">}</span></span>
<span class="line">	outputWriter<span class="token punctuation">.</span><span class="token function">Flush</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>除了文件句柄，我们还需要 <code v-pre>bufio</code> 的 <code v-pre>Writer</code>。我们以只写模式打开文件 <code v-pre>output.dat</code>，如果文件不存在则自动创建：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">outputFile<span class="token punctuation">,</span> outputError <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">OpenFile</span><span class="token punctuation">(</span><span class="token string">"output.dat"</span><span class="token punctuation">,</span> os<span class="token punctuation">.</span>O_WRONLY<span class="token operator">|</span>os<span class="token punctuation">.</span>O_CREATE<span class="token punctuation">,</span> <span class="token number">0666</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>可以看到，<code v-pre>OpenFile</code> 函数有三个参数：文件名、一个或多个标志（使用逻辑运算符 <code v-pre>|</code> 连接），使用的文件权限。</p>
<p>我们通常会用到以下标志：</p>
<ul>
<li><code v-pre>os.O_RDONLY</code>：只读</li>
<li><code v-pre>os.O_WRONLY</code>：只写</li>
<li><code v-pre>os.O_CREATE</code>：创建：如果指定文件不存在，就创建该文件。</li>
<li><code v-pre>os.O_TRUNC</code>：截断：如果指定文件已存在，就将该文件的长度截为 0 。</li>
</ul>
<p>在读文件的时候，文件的权限是被忽略的，所以在使用 <code v-pre>OpenFile()</code> 时传入的第三个参数可以用 0 。而在写文件时，不管是 Unix 还是 Windows，都需要使用 <code v-pre>0666</code>。</p>
<p>然后，我们创建一个写入器（缓冲区）对象：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line">outputWriter <span class="token operator">:=</span> bufio<span class="token punctuation">.</span><span class="token function">NewWriter</span><span class="token punctuation">(</span>outputFile<span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>接着，使用一个 <code v-pre>for</code> 循环，将字符串写入缓冲区，写 10 次：<code v-pre>outputWriter.WriteString(outputString)</code></p>
<p>缓冲区的内容紧接着被完全写入文件：<code v-pre>outputWriter.Flush()</code></p>
<p>如果写入的东西很简单，我们可以使用 <code v-pre>fmt.Fprintf(outputFile, &quot;Some test data.\n&quot;)</code> 直接将内容写入文件。<code v-pre>fmt</code> 包里的 <code v-pre>F...</code> 开头的 <code v-pre>Print()</code> 函数可以直接写入任何 <code v-pre>io.Writer</code>，包括文件（请参考<RouteLink to="/chapter-3/12.8.html">章节 12.8</RouteLink>)。</p>
<p>程序 <code v-pre>filewrite.go</code> 展示了不使用 <code v-pre>fmt.FPrintf()</code> 函数，使用其他函数如何写文件：</p>
<p>示例 12.8 <a href="examples/chapter_12/filewrite.go">filewrite.go</a>：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token string">"os"</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">	os<span class="token punctuation">.</span>Stdout<span class="token punctuation">.</span><span class="token function">WriteString</span><span class="token punctuation">(</span><span class="token string">"hello, world\n"</span><span class="token punctuation">)</span></span>
<span class="line">	f<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> os<span class="token punctuation">.</span><span class="token function">OpenFile</span><span class="token punctuation">(</span><span class="token string">"test"</span><span class="token punctuation">,</span> os<span class="token punctuation">.</span>O_CREATE<span class="token operator">|</span>os<span class="token punctuation">.</span>O_WRONLY<span class="token punctuation">,</span> <span class="token number">0666</span><span class="token punctuation">)</span></span>
<span class="line">	<span class="token keyword">defer</span> f<span class="token punctuation">.</span><span class="token function">Close</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">	f<span class="token punctuation">.</span><span class="token function">WriteString</span><span class="token punctuation">(</span><span class="token string">"hello, world in a file\n"</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>使用 <code v-pre>os.Stdout.WriteString(&quot;hello, world\n&quot;)</code>，我们可以输出到屏幕。</p>
<p>我们以只写模式创建或打开文件 <code v-pre>&quot;test&quot;</code> ，并且忽略了可能发生的错误：<code v-pre>f, _ := os.OpenFile(&quot;test&quot;, os.O_CREATE|os.O_WRONLY, 0666)</code></p>
<p>我们不使用缓冲区，直接将内容写入文件：<code v-pre>f.WriteString()</code></p>
<p><strong>练习 12.4</strong>：<a href="exercises/chapter_12/wiki_part1.go">wiki_part1.go</a></p>
<p>（这是一个独立的练习，但是同时也是为<RouteLink to="/chapter-3/15.4.html">章节 15.4</RouteLink> 做准备）</p>
<p>程序中的数据结构如下，是一个包含以下字段的结构:</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">type</span> Page <span class="token keyword">struct</span> <span class="token punctuation">{</span></span>
<span class="line">    Title <span class="token builtin">string</span></span>
<span class="line">    Body  <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>请给这个结构编写一个 <code v-pre>save()</code> 方法，将 Title 作为文件名、Body 作为文件内容，写入到文本文件中。</p>
<p>再编写一个 <code v-pre>load()</code> 函数，接收的参数是字符串 <code v-pre>title</code>，该函数读取出与 <code v-pre>title</code> 对应的文本文件。请使用 <code v-pre>*Page</code> 做为参数，因为这个结构可能相当巨大，我们不想在内存中拷贝它。请使用 <code v-pre>ioutil</code> 包里的函数（参考<RouteLink to="/chapter-3/12.2.html">章节 12.2.1</RouteLink>）。</p>
<h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接"><span>链接</span></a></h2>
<ul>
<li><RouteLink to="/chapter-3/directory.html">目录</RouteLink></li>
<li>上一节：<RouteLink to="/chapter-3/12.1.html">读取用户的输入</RouteLink></li>
<li>下一节：<RouteLink to="/chapter-3/12.3.html">文件拷贝</RouteLink></li>
</ul>
</div></template>


