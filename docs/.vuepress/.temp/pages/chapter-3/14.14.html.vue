<template><div><h1 id="_14-14-并行化大量数据的计算" tabindex="-1"><a class="header-anchor" href="#_14-14-并行化大量数据的计算"><span>14.14 并行化大量数据的计算</span></a></h1>
<p>假设我们需要处理一些数量巨大且互不相关的数据项，它们从一个 <code v-pre>in</code> 通道被传递进来，当我们处理完以后又要将它们放入另一个 <code v-pre>out</code> 通道，就像一个工厂流水线一样。处理每个数据项也可能包含许多步骤：</p>
<p>Preprocess（预处理） / StepA（步骤A） / StepB（步骤B） / ... / PostProcess（后处理）</p>
<p>一个典型的用于解决按顺序执行每个步骤的顺序流水线算法可以写成下面这样：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> <span class="token function">SerialProcessData</span><span class="token punctuation">(</span>in <span class="token operator">&lt;-</span><span class="token keyword">chan</span> <span class="token operator">*</span>Data<span class="token punctuation">,</span> out <span class="token keyword">chan</span><span class="token operator">&lt;-</span> <span class="token operator">*</span>Data<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">for</span> data <span class="token operator">:=</span> <span class="token keyword">range</span> in <span class="token punctuation">{</span></span>
<span class="line">        tmpA <span class="token operator">:=</span> <span class="token function">PreprocessData</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span></span>
<span class="line">        tmpB <span class="token operator">:=</span> <span class="token function">ProcessStepA</span><span class="token punctuation">(</span>tmpA<span class="token punctuation">)</span></span>
<span class="line">        tmpC <span class="token operator">:=</span> <span class="token function">ProcessStepB</span><span class="token punctuation">(</span>tmpB<span class="token punctuation">)</span></span>
<span class="line">        out <span class="token operator">&lt;-</span> <span class="token function">PostProcessData</span><span class="token punctuation">(</span>tmpC<span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一次只执行一个步骤，并且按顺序处理每个项目：在第 1 个项目没有被 <code v-pre>PostProcessData()</code> 并放入 <code v-pre>out</code> 通道之前绝不会处理第 2 个项目。</p>
<p>如果你仔细想想，你很快就会发现这将会造成巨大的时间浪费。</p>
<p>一个更高效的计算方式是让每一个处理步骤作为一个协程独立工作。每一个步骤从上一步的输出通道中获得输入数据。这种方式仅有极少数时间会被浪费，而大部分时间所有的步骤都在一直执行中：</p>
<div class="language-go line-numbers-mode" data-highlighter="prismjs" data-ext="go" data-title="go"><pre v-pre><code><span class="line"><span class="token keyword">func</span> ParallelProcessData <span class="token punctuation">(</span>in <span class="token operator">&lt;-</span><span class="token keyword">chan</span> <span class="token operator">*</span>Data<span class="token punctuation">,</span> out <span class="token keyword">chan</span><span class="token operator">&lt;-</span> <span class="token operator">*</span>Data<span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token comment">// make channels:</span></span>
<span class="line">    preOut <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token operator">*</span>Data<span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span></span>
<span class="line">    stepAOut <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token operator">*</span>Data<span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span></span>
<span class="line">    stepBOut <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token operator">*</span>Data<span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span></span>
<span class="line">    stepCOut <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token keyword">chan</span> <span class="token operator">*</span>Data<span class="token punctuation">,</span> <span class="token number">100</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token comment">// start parallel computations:</span></span>
<span class="line">    <span class="token keyword">go</span> <span class="token function">PreprocessData</span><span class="token punctuation">(</span>in<span class="token punctuation">,</span> preOut<span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">go</span> <span class="token function">ProcessStepA</span><span class="token punctuation">(</span>preOut<span class="token punctuation">,</span>StepAOut<span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">go</span> <span class="token function">ProcessStepB</span><span class="token punctuation">(</span>StepAOut<span class="token punctuation">,</span>StepBOut<span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">go</span> <span class="token function">ProcessStepC</span><span class="token punctuation">(</span>StepBOut<span class="token punctuation">,</span>StepCOut<span class="token punctuation">)</span></span>
<span class="line">    <span class="token keyword">go</span> <span class="token function">PostProcessData</span><span class="token punctuation">(</span>StepCOut<span class="token punctuation">,</span>out<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span>   </span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>通道的缓冲区大小可以用来进一步优化整个过程。</p>
<h2 id="链接" tabindex="-1"><a class="header-anchor" href="#链接"><span>链接</span></a></h2>
<ul>
<li><RouteLink to="/chapter-3/directory.html">目录</RouteLink></li>
<li>上一节：<RouteLink to="/chapter-3/14.13.html">在多核心上并行计算</RouteLink></li>
<li>下一节：<RouteLink to="/chapter-3/14.15.html">漏桶算法</RouteLink></li>
</ul>
</div></template>


