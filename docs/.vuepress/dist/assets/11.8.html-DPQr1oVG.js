import{_ as p,c as i,a as l,b as e,f as s,d as t,e as o,r as d,o as r}from"./app-DtITwm2S.js";const u={};function c(k,n){const a=d("RouteLink");return r(),i("div",null,[n[17]||(n[17]=l(`<h1 id="_11-8-第二个例子-读和写" tabindex="-1"><a class="header-anchor" href="#_11-8-第二个例子-读和写"><span>11.8 第二个例子：读和写</span></a></h1><p>读和写是软件中很普遍的行为，提起它们会立即想到读写文件、缓存（比如字节或字符串切片）、标准输入输出、标准错误以及网络连接、管道等等，或者读写我们的自定义类型。为了让代码尽可能通用，Go 采取了一致的方式来读写数据。</p><p><code>io</code> 包提供了用于读和写的接口 <code>io.Reader</code> 和 <code>io.Writer</code>：</p><div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre><code><span class="line"><span class="token keyword">type</span> Reader <span class="token keyword">interface</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">Read</span><span class="token punctuation">(</span>p <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>n <span class="token builtin">int</span><span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">type</span> Writer <span class="token keyword">interface</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token function">Write</span><span class="token punctuation">(</span>p <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>n <span class="token builtin">int</span><span class="token punctuation">,</span> err <span class="token builtin">error</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>只要类型实现了读写接口，提供 <code>Read</code> 和 <code>Write</code> 方法，就可以从它读取数据，或向它写入数据。一个对象要是可读的，它必须实现 <code>io.Reader</code> 接口，这个接口只有一个签名是 <code>Read(p []byte) (n int, err error)</code> 的方法，它从调用它的对象上读取数据，并把读到的数据放入参数中的字节切片中，然后返回读取的字节数和一个 <code>error</code> 对象，如果没有错误发生返回 <code>nil</code>，如果已经到达输入的尾端，会返回 <code>io.EOF(&quot;EOF&quot;)</code>，如果读取的过程中发生了错误，就会返回具体的错误信息。类似地，一个对象要是可写的，它必须实现 <code>io.Writer</code> 接口，这个接口也只有一个签名是 <code>Write(p []byte) (n int, err error)</code> 的方法，它将指定字节切片中的数据写入调用它的对象里，然后返回实际写入的字节数和一个 <code>error</code> 对象（如果没有错误发生就是 <code>nil</code>）。</p>`,5)),e("p",null,[n[1]||(n[1]=e("code",null,"io",-1)),n[2]||(n[2]=s(" 包里的 ")),n[3]||(n[3]=e("code",null,"Readers",-1)),n[4]||(n[4]=s(" 和 ")),n[5]||(n[5]=e("code",null,"Writers",-1)),n[6]||(n[6]=s(" 都是不带缓冲的，")),n[7]||(n[7]=e("code",null,"bufio",-1)),n[8]||(n[8]=s(" 包里提供了对应的带缓冲的操作，在读写 ")),n[9]||(n[9]=e("code",null,"UTF-8",-1)),n[10]||(n[10]=s(" 编码的文本文件时它们尤其有用。在")),t(a,{to:"/chapter-2/12.0.html"},{default:o(()=>n[0]||(n[0]=[s("第 12 章")])),_:1}),n[11]||(n[11]=s("我们会看到很多在实战中使用它们的例子。"))]),n[18]||(n[18]=l('<p>在实际编程中尽可能的使用这些接口，会使程序变得更通用，可以在任何实现了这些接口的类型上使用读写方法。</p><p>例如一个 <code>JPEG</code> 图形解码器，通过一个 <code>Reader</code> 参数，它可以解码来自磁盘、网络连接或以 <code>gzip</code> 压缩的 <code>HTTP</code> 流中的 <code>JPEG</code> 图形数据，或者其他任何实现了 <code>Reader</code> 接口的对象。</p><h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接"><span>链接</span></a></h2>',3)),e("ul",null,[e("li",null,[t(a,{to:"/chapter-2/directory.html"},{default:o(()=>n[12]||(n[12]=[s("目录")])),_:1})]),e("li",null,[n[14]||(n[14]=s("上一节：")),t(a,{to:"/chapter-2/11.7.html"},{default:o(()=>n[13]||(n[13]=[s("第一个例子：使用Sorter接口排序")])),_:1})]),e("li",null,[n[16]||(n[16]=s("下一节：")),t(a,{to:"/chapter-2/11.9.html"},{default:o(()=>n[15]||(n[15]=[s("空接口")])),_:1})])])])}const b=p(u,[["render",c],["__file","11.8.html.vue"]]),v=JSON.parse('{"path":"/chapter-2/11.8.html","title":"11.8 第二个例子：读和写","lang":"zh-cn","frontmatter":{},"headers":[{"level":1,"title":"11.8 第二个例子：读和写","slug":"_11-8-第二个例子-读和写","link":"#_11-8-第二个例子-读和写","children":[{"level":2,"title":"链接","slug":"链接","link":"#链接","children":[]}]}],"git":{},"filePathRelative":"chapter-2/11.8.md"}');export{b as comp,v as data};