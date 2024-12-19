import{_ as i,c as o,b as a,f as s,d as e,e as t,a as l,r as c,o as u}from"./app-DtITwm2S.js";const r={};function d(k,n){const p=c("RouteLink");return u(),o("div",null,[n[26]||(n[26]=a("h1",{id:"_6-2-函数参数与返回值",tabindex:"-1"},[a("a",{class:"header-anchor",href:"#_6-2-函数参数与返回值"},[a("span",null,"6.2 函数参数与返回值")])],-1)),a("p",null,[n[1]||(n[1]=s("函数能够接收参数供自己使用，也可以返回零个或多个值（我们通常把返回多个值称为返回一组值）。相比与 C、C++、Java 和 C#，多值返回是 Go 的一大特性，为我们判断一个函数是否正常执行（参考 ")),e(p,{to:"/chapter-2/05.2.html"},{default:t(()=>n[0]||(n[0]=[s("第 5.2 节")])),_:1}),n[2]||(n[2]=s("）提供了方便。"))]),a("p",null,[n[4]||(n[4]=s("我们通过 ")),n[5]||(n[5]=a("code",null,"return",-1)),n[6]||(n[6]=s(" 关键字返回一组值。事实上，任何一个有返回值（单个或多个）的函数都必须以 ")),n[7]||(n[7]=a("code",null,"return",-1)),n[8]||(n[8]=s(" 或 ")),n[9]||(n[9]=a("code",null,"panic",-1)),n[10]||(n[10]=s("（参考 ")),e(p,{to:"/chapter-2/13.0.html"},{default:t(()=>n[3]||(n[3]=[s("第 13 章")])),_:1}),n[11]||(n[11]=s("）结尾。"))]),n[27]||(n[27]=l(`<p>在函数块里面，<code>return</code> 之后的语句都不会执行。如果一个函数需要返回值，那么这个函数里面的每一个代码分支 (code-path) 都要有 <code>return</code> 语句。</p><p>问题 6.1：下面的函数将不会被编译，为什么呢？大家可以试着纠正过来。</p><div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre><code><span class="line"><span class="token keyword">func</span> <span class="token punctuation">(</span>st <span class="token operator">*</span>Stack<span class="token punctuation">)</span> <span class="token function">Pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span></span>
<span class="line">    v <span class="token operator">:=</span> <span class="token number">0</span></span>
<span class="line">    <span class="token keyword">for</span> ix <span class="token operator">:=</span> <span class="token function">len</span><span class="token punctuation">(</span>st<span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span> ix <span class="token operator">&gt;=</span> <span class="token number">0</span><span class="token punctuation">;</span> ix<span class="token operator">--</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">if</span> v <span class="token operator">=</span> st<span class="token punctuation">[</span>ix<span class="token punctuation">]</span><span class="token punctuation">;</span> v <span class="token operator">!=</span> <span class="token number">0</span> <span class="token punctuation">{</span></span>
<span class="line">            st<span class="token punctuation">[</span>ix<span class="token punctuation">]</span> <span class="token operator">=</span> <span class="token number">0</span></span>
<span class="line">            <span class="token keyword">return</span> v</span>
<span class="line">        <span class="token punctuation">}</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span>    </span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>函数定义时，它的形参一般是有名字的，不过我们也可以定义没有形参名的函数，只有相应的形参类型，就像这样：<code>func f(int, int, float64)</code>。</p><p>没有参数的函数通常被称为 <strong>niladic</strong> 函数 (niladic function)，就像 <code>main.main()</code>。</p><h2 id="_6-2-1-按值传递-call-by-value-按引用传递-call-by-reference" tabindex="-1"><a class="header-anchor" href="#_6-2-1-按值传递-call-by-value-按引用传递-call-by-reference"><span>6.2.1 按值传递 (call by value) 按引用传递 (call by reference)</span></a></h2><p>Go 默认使用按值传递来传递参数，也就是传递参数的副本。函数接收参数副本之后，在使用变量的过程中可能对副本的值进行更改，但不会影响到原来的变量，比如 <code>Function(arg1)</code>。</p><p>如果你希望函数可以直接修改参数的值，而不是对参数的副本进行操作，你需要将参数的地址（变量名前面添加 <code>&amp;</code> 符号，比如 <code>&amp;variable</code>）传递给函数，这就是按引用传递，比如 <code>Function(&amp;arg1)</code>，此时传递给函数的是一个指针。如果传递给函数的是一个指针，指针的值（一个地址）会被复制，但指针的值所指向的地址上的值不会被复制；我们可以通过这个指针的值来修改这个值所指向的地址上的值。（<strong>译者注：指针也是变量类型，有自己的地址和值，通常指针的值指向一个变量的地址。所以，按引用传递也是按值传递。</strong>）</p><p>几乎在任何情况下，传递指针（一个32位或者64位的值）的消耗都比传递副本来得少。</p><p>在函数调用时，像切片 (slice)、字典 (map)、接口 (interface)、通道 (channel) 这样的引用类型都是默认使用引用传递（即使没有显式的指出指针）。</p><p>有些函数只是完成一个任务，并没有返回值。我们仅仅是利用了这种函数的副作用 (side-effect)，就像输出文本到终端，发送一个邮件或者是记录一个错误等。</p><p>但是绝大部分的函数还是带有返回值的。</p><p>如下，simple_function.go 里的 <code>MultiPly3Nums</code> 函数带有三个形参，分别是 <code>a</code>、<code>b</code>、<code>c</code>，还有一个 <code>int</code> 类型的返回值（被注释的代码具有和未注释部分同样的功能，只是多引入了一个本地变量）：</p><p>示例 6.2 <a href="examples/chapter_6/simple_function.go">simple_function.go</a></p><div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;Multiply 2 * 5 * 6 = %d\\n&quot;</span><span class="token punctuation">,</span> <span class="token function">MultiPly3Nums</span><span class="token punctuation">(</span><span class="token number">2</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token comment">// var i1 int = MultiPly3Nums(2, 5, 6)</span></span>
<span class="line">    <span class="token comment">// fmt.Printf(&quot;MultiPly 2 * 5 * 6 = %d\\n&quot;, i1)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">MultiPly3Nums</span><span class="token punctuation">(</span>a <span class="token builtin">int</span><span class="token punctuation">,</span> b <span class="token builtin">int</span><span class="token punctuation">,</span> c <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token builtin">int</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// var product int = a * b * c</span></span>
<span class="line">    <span class="token comment">// return product</span></span>
<span class="line">    <span class="token keyword">return</span> a <span class="token operator">*</span> b <span class="token operator">*</span> c</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出显示：</p><pre><code>Multiply 2 * 5 * 6 = 60
</code></pre><p>如果一个函数需要返回四到五个值，我们可以传递一个切片给函数（如果返回值具有相同类型）或者是传递一个结构体（如果返回值具有不同的类型）。因为传递一个指针允许直接修改变量的值，消耗也更少。</p><p>问题 6.2：</p><p>如下的两个函数调用有什么不同：</p><pre><code>(A) func DoSomething(a *A) {
        b = a
    }

(B) func DoSomething(a A) {
        b = &amp;a
    }
</code></pre><h2 id="_6-2-2-命名的返回值-named-return-variables" tabindex="-1"><a class="header-anchor" href="#_6-2-2-命名的返回值-named-return-variables"><span>6.2.2 命名的返回值 (named return variables)</span></a></h2><p>如下 multiple_return.go 里的函数带有一个 <code>int</code> 参数，返回两个 <code>int</code> 值；其中一个函数的返回值在函数调用时就已经被赋予了一个初始零值。</p><p><code>getX2AndX3</code> 与 <code>getX2AndX3_2</code> 两个函数演示了如何使用非命名返回值与命名返回值的特性。当需要返回多个非命名返回值时，需要使用 <code>()</code> 把它们括起来，比如 <code>(int, int)</code>。</p>`,24)),a("p",null,[n[13]||(n[13]=s("命名返回值作为结果形参 (result parameters) 被初始化为相应类型的零值，当需要返回的时候，我们只需要一条简单的不带参数的 ")),n[14]||(n[14]=a("code",null,"return",-1)),n[15]||(n[15]=s(" 语句。需要注意的是，即使只有一个命名返回值，也需要使用 ")),n[16]||(n[16]=a("code",null,"()",-1)),n[17]||(n[17]=s(" 括起来（参考")),e(p,{to:"/chapter-2/06.6.html"},{default:t(()=>n[12]||(n[12]=[s("第 6.6 节")])),_:1}),n[18]||(n[18]=s(" 的 ")),n[19]||(n[19]=a("a",{href:"./examples/chapter_6/fibonacci.go"},"fibonacci.go",-1)),n[20]||(n[20]=s(" 函数）。"))]),n[28]||(n[28]=l(`<p>示例 6.3 <a href="examples/chapter_6/multiple_return.go">multiple_return.go</a></p><div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">var</span> num <span class="token builtin">int</span> <span class="token operator">=</span> <span class="token number">10</span></span>
<span class="line"><span class="token keyword">var</span> numx2<span class="token punctuation">,</span> numx3 <span class="token builtin">int</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    numx2<span class="token punctuation">,</span> numx3 <span class="token operator">=</span> <span class="token function">getX2AndX3</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span></span>
<span class="line">    <span class="token function">PrintValues</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    numx2<span class="token punctuation">,</span> numx3 <span class="token operator">=</span> <span class="token function">getX2AndX3_2</span><span class="token punctuation">(</span>num<span class="token punctuation">)</span></span>
<span class="line">    <span class="token function">PrintValues</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">PrintValues</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;num = %d, 2x num = %d, 3x num = %d\\n&quot;</span><span class="token punctuation">,</span> num<span class="token punctuation">,</span> numx2<span class="token punctuation">,</span> numx3<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">getX2AndX3</span><span class="token punctuation">(</span>input <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token number">2</span> <span class="token operator">*</span> input<span class="token punctuation">,</span> <span class="token number">3</span> <span class="token operator">*</span> input</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">getX2AndX3_2</span><span class="token punctuation">(</span>input <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>x2 <span class="token builtin">int</span><span class="token punctuation">,</span> x3 <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    x2 <span class="token operator">=</span> <span class="token number">2</span> <span class="token operator">*</span> input</span>
<span class="line">    x3 <span class="token operator">=</span> <span class="token number">3</span> <span class="token operator">*</span> input</span>
<span class="line">    <span class="token comment">// return x2, x3</span></span>
<span class="line">    <span class="token keyword">return</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出结果：</p><pre><code>num = 10, 2x num = 20, 3x num = 30    
num = 10, 2x num = 20, 3x num = 30 
</code></pre><p>提示：</p><p>虽然 <code>return</code> 或 <code>return var</code> 都是可以的，但是 <code>return var = expression</code>（表达式） 会引发一个编译错误：</p><p><code>syntax error: unexpected =, expecting semicolon or newline or }</code>。</p><p>即使函数使用了命名返回值，你依旧可以无视它而返回明确的值。</p><p>任何一个非命名返回值（使用非命名返回值是很糟的编程习惯）在 <code>return</code> 语句里面都要明确指出包含返回值的变量或是一个可计算的值（就像上面警告所指出的那样）。</p><p><strong>尽量使用命名返回值：会使代码更清晰、更简短，同时更加容易读懂。</strong></p><p>练习 6.1 <a href="exercises/chapter_6/mult_returnval.go">mult_returnval.go</a></p><p>编写一个函数，接收两个整数，然后返回它们的和、积与差。编写两个版本，一个是非命名返回值，一个是命名返回值。</p><p>练习 6.2 <a href="exercises/chapter_6/error_returnval.go">error_returnval.go</a></p><p>编写一个名字为 <code>MySqrt()</code> 的函数，计算一个 <code>float64</code> 类型浮点数的平方根，如果参数是一个负数的话将返回一个错误。编写两个版本，一个是非命名返回值，一个是命名返回值。</p><h2 id="_6-2-3-空白符-blank-identifier" tabindex="-1"><a class="header-anchor" href="#_6-2-3-空白符-blank-identifier"><span>6.2.3 空白符 (blank identifier)</span></a></h2><p>空白符用来匹配一些不需要的值，然后丢弃掉，下面的 blank_identifier.go 就是很好的例子。</p><p><code>ThreeValues</code> 是拥有三个返回值的不需要任何参数的函数，在下面的例子中，我们将第一个与第三个返回值赋给了 <code>i1</code> 与 <code>f1</code>。第二个返回值赋给了空白符 <code>_</code>，然后自动丢弃掉。</p><p>示例 6.4 <a href="examples/chapter_6/blank_identifier.go">blank_identifier.go</a></p><div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">var</span> i1 <span class="token builtin">int</span></span>
<span class="line">    <span class="token keyword">var</span> f1 <span class="token builtin">float32</span></span>
<span class="line">    i1<span class="token punctuation">,</span> <span class="token boolean">_</span><span class="token punctuation">,</span> f1 <span class="token operator">=</span> <span class="token function">ThreeValues</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;The int: %d, the float: %f \\n&quot;</span><span class="token punctuation">,</span> i1<span class="token punctuation">,</span> f1<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">ThreeValues</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token builtin">int</span><span class="token punctuation">,</span> <span class="token builtin">float32</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> <span class="token number">5</span><span class="token punctuation">,</span> <span class="token number">6</span><span class="token punctuation">,</span> <span class="token number">7.5</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出结果：</p><pre><code>The int: 5, the float: 7.500000
</code></pre><p>另外一个示例，函数接收两个参数，比较它们的大小，然后按小-大的顺序返回这两个数，示例代码为 minmax.go。</p><p>示例 6.5 <a href="examples/chapter_6/minmax.go">minmax.go</a></p><div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token string">&quot;fmt&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">var</span> min<span class="token punctuation">,</span> max <span class="token builtin">int</span></span>
<span class="line">    min<span class="token punctuation">,</span> max <span class="token operator">=</span> <span class="token function">MinMax</span><span class="token punctuation">(</span><span class="token number">78</span><span class="token punctuation">,</span> <span class="token number">65</span><span class="token punctuation">)</span></span>
<span class="line">    fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">&quot;Minmium is: %d, Maximum is: %d\\n&quot;</span><span class="token punctuation">,</span> min<span class="token punctuation">,</span> max<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">MinMax</span><span class="token punctuation">(</span>a <span class="token builtin">int</span><span class="token punctuation">,</span> b <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">(</span>min <span class="token builtin">int</span><span class="token punctuation">,</span> max <span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">if</span> a <span class="token operator">&lt;</span> b <span class="token punctuation">{</span></span>
<span class="line">        min <span class="token operator">=</span> a</span>
<span class="line">        max <span class="token operator">=</span> b</span>
<span class="line">    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span> <span class="token comment">// a = b or a &lt; b</span></span>
<span class="line">        min <span class="token operator">=</span> b</span>
<span class="line">        max <span class="token operator">=</span> a</span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line">    <span class="token keyword">return</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>输出结果：</p><pre><code>Minimum is: 65, Maximum is 78
</code></pre><h2 id="_6-2-4-改变外部变量-outside-variable" tabindex="-1"><a class="header-anchor" href="#_6-2-4-改变外部变量-outside-variable"><span>6.2.4 改变外部变量 (outside variable)</span></a></h2><p>传递指针给函数不但可以节省内存（因为没有复制变量的值），而且赋予了函数直接修改外部变量的能力，所以被修改的变量不再需要使用 <code>return</code> 返回。如下的例子，<code>reply</code> 是一个指向 <code>int</code> 变量的指针，通过这个指针，我们在函数内修改了这个 <code>int</code> 变量的数值。</p><p>示例 6.6 <a href="examples/chapter_6/side_effect.go">side_effect.go</a></p><div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre><code><span class="line"><span class="token keyword">package</span> main</span>
<span class="line"></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">(</span></span>
<span class="line">    <span class="token string">&quot;fmt&quot;</span></span>
<span class="line"><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// this function changes reply:</span></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">Multiply</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> b <span class="token builtin">int</span><span class="token punctuation">,</span> reply <span class="token operator">*</span><span class="token builtin">int</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token operator">*</span>reply <span class="token operator">=</span> a <span class="token operator">*</span> b</span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    n <span class="token operator">:=</span> <span class="token number">0</span></span>
<span class="line">    reply <span class="token operator">:=</span> <span class="token operator">&amp;</span>n</span>
<span class="line">    <span class="token function">Multiply</span><span class="token punctuation">(</span><span class="token number">10</span><span class="token punctuation">,</span> <span class="token number">5</span><span class="token punctuation">,</span> reply<span class="token punctuation">)</span></span>
<span class="line">    fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">&quot;Multiply:&quot;</span><span class="token punctuation">,</span> <span class="token operator">*</span>reply<span class="token punctuation">)</span> <span class="token comment">// Multiply: 50</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>这仅仅是个指导性的例子，当需要在函数内改变一个占用内存比较大的变量时，性能优势就更加明显了。然而，如果不小心使用的话，传递一个指针很容易引发一些不确定的事，所以，我们要十分小心那些可以改变外部变量的函数，在必要时，需要添加注释以便其他人能够更加清楚的知道函数里面到底发生了什么。</p><h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接"><span>链接</span></a></h2>`,32)),a("ul",null,[a("li",null,[e(p,{to:"/chapter-2/directory.html"},{default:t(()=>n[21]||(n[21]=[s("目录")])),_:1})]),a("li",null,[n[23]||(n[23]=s("上一节：")),e(p,{to:"/chapter-2/06.1.html"},{default:t(()=>n[22]||(n[22]=[s("函数介绍")])),_:1})]),a("li",null,[n[25]||(n[25]=s("下一节：")),e(p,{to:"/chapter-2/06.3.html"},{default:t(()=>n[24]||(n[24]=[s("传递变长参数")])),_:1})])])])}const v=i(r,[["render",d],["__file","06.2.html.vue"]]),b=JSON.parse('{"path":"/chapter-2/06.2.html","title":"6.2 函数参数与返回值","lang":"zh-cn","frontmatter":{},"headers":[{"level":1,"title":"6.2 函数参数与返回值","slug":"_6-2-函数参数与返回值","link":"#_6-2-函数参数与返回值","children":[{"level":2,"title":"6.2.1 按值传递 (call by value) 按引用传递 (call by reference)","slug":"_6-2-1-按值传递-call-by-value-按引用传递-call-by-reference","link":"#_6-2-1-按值传递-call-by-value-按引用传递-call-by-reference","children":[]},{"level":2,"title":"6.2.2 命名的返回值 (named return variables)","slug":"_6-2-2-命名的返回值-named-return-variables","link":"#_6-2-2-命名的返回值-named-return-variables","children":[]},{"level":2,"title":"6.2.3 空白符 (blank identifier)","slug":"_6-2-3-空白符-blank-identifier","link":"#_6-2-3-空白符-blank-identifier","children":[]},{"level":2,"title":"6.2.4 改变外部变量 (outside variable)","slug":"_6-2-4-改变外部变量-outside-variable","link":"#_6-2-4-改变外部变量-outside-variable","children":[]},{"level":2,"title":"链接","slug":"链接","link":"#链接","children":[]}]}],"git":{},"filePathRelative":"chapter-2/06.2.md"}');export{v as comp,b as data};