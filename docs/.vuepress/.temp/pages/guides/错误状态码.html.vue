<template><div><h1 id="错误代码" tabindex="-1"><a class="header-anchor" href="#错误代码"><span><a href="https://platform.openai.com/docs/guides/error-codes/error-codes" target="_blank" rel="noopener noreferrer">错误代码</a></span></a></h1>
<p>本指南概述了您可能会从<a href="/start/%E4%BB%8B%E7%BB%8D">API</a>和我们的<RouteLink to="/start/%E5%BA%93.html#python%E5%BA%93">官方 Python 库</RouteLink>中看到的错误代码。概述中提到的每个错误代码都有专门的部分提供进一步的指导。</p>
<h2 id="api错误" tabindex="-1"><a class="header-anchor" href="#api错误"><span>API错误</span></a></h2>
<table>
<thead>
<tr>
<th style="text-align:left">代码</th>
<th style="text-align:left">概述</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">401 - 无效的身份验证</td>
<td style="text-align:left"><strong>原因</strong>：无效的身份验证 <br><strong>解决方案</strong>：确保使用正确的<a href="https://platform.openai.com/account/api-keys" target="_blank" rel="noopener noreferrer">API 密钥</a>和请求组织。</td>
</tr>
<tr>
<td style="text-align:left">401 - 提供的 API 密钥不正确</td>
<td style="text-align:left"><strong>原因</strong>：请求的 API 密钥不正确。 <br><strong>解决方案</strong>：确保使用的 API 密钥正确，清除浏览器缓存，或<a href="https://platform.openai.com/account/api-keys" target="_blank" rel="noopener noreferrer">生成一个新的</a>。</td>
</tr>
<tr>
<td style="text-align:left">401 - 您必须是组织的成员才能使用 API</td>
<td style="text-align:left"><strong>原因</strong>：您的帐户不属于组织。 <br><strong>解决方案</strong>：联系我们以加入新组织，或让您的组织经理<a href="https://platform.openai.com/account/members" target="_blank" rel="noopener noreferrer">邀请您加入组织</a>。</td>
</tr>
<tr>
<td style="text-align:left">429 - 达到请求的速率限制</td>
<td style="text-align:left"><strong>原因</strong>：您发送请求的速度太快了。 <br><strong>解决方案</strong>：调整您的请求。阅读<a href="/guides/%E9%80%9F%E7%8E%87%E9%99%90%E5%88%B6">速率限制指南</a>。</td>
</tr>
<tr>
<td style="text-align:left">429 - 您超出了当前配额，请检查您的计划和账单明细</td>
<td style="text-align:left"><strong>原因</strong>：您已达到每月最大支出（硬性限制），您可以在<a href="https://platform.openai.com/account/billing/limits" target="_blank" rel="noopener noreferrer">账户账单部分</a>查看。 <br><strong>解决方案</strong>： <a href="https://platform.openai.com/forms/quota-increase" target="_blank" rel="noopener noreferrer">申请增加配额</a>。</td>
</tr>
<tr>
<td style="text-align:left">429 - 引擎当前超载，请稍后再试</td>
<td style="text-align:left"><strong>原因</strong>：我们的服务器流量过高。 <br><strong>解决方案</strong>：请稍等片刻后重试您的请求。</td>
</tr>
<tr>
<td style="text-align:left">500 - 服务器在处理您的请求时出错</td>
<td style="text-align:left"><strong>原因</strong>：我们的服务器出现问题。 <br><strong>解决方案</strong>：稍等片刻后重试您的请求，如果问题仍然存在，请联系我们。检查<a href="https://status.openai.com/" target="_blank" rel="noopener noreferrer">状态页面</a>。</td>
</tr>
</tbody>
</table>
<details class="hint-container details"><summary>401 - 无效的身份验证</summary>
<p>此错误消息表明您的身份验证凭据无效。发生这种情况的原因可能有多种，例如：</p>
<ul>
<li>您使用的是已撤销的 API 密钥。</li>
<li>您使用的 API 密钥与分配给请求组织的 API 密钥不同。</li>
<li>您使用的 API 密钥没有您所调用端点所需的权限。</li>
</ul>
<p>要解决此错误，请执行以下步骤：</p>
<ul>
<li>
<p>检查您是否在请求标头中使用了正确的 API 密钥和组织 ID。<a href="https://platform.openai.com/account/api-keys" target="_blank" rel="noopener noreferrer">您可以在您的帐户设置</a>中找到您的 API 密钥和组织 ID 。</p>
</li>
<li>
<p>如果您不确定您的 API 密钥是否有效，您可以<a href="https://platform.openai.com/account/api-keys" target="_blank" rel="noopener noreferrer">生成一个新密钥</a>。确保在您的请求中用新的 API 密钥替换旧的 API 密钥，并遵循我们的<a href="https://help.openai.com/en/articles/5112595-best-practices-for-api-key-safety" target="_blank" rel="noopener noreferrer">最佳实践指南</a>。</p>
</li>
</ul>
</details>
<details class="hint-container details"><summary>401 - 提供的 API 密钥不正确</summary>
<p>此错误消息表示您在请求中使用的 API 密钥不正确。发生这种情况的原因可能有多种，例如：</p>
<ul>
<li>您的 API 密钥中有拼写错误或多余的空格。</li>
<li>您正在使用属于不同组织的 API 密钥。</li>
<li>您正在使用已被删除或停用的 API 密钥。</li>
<li>旧的、已撤销的 API 密钥可能会缓存在本地。</li>
</ul>
<p>要解决此错误，请执行以下步骤：</p>
<ul>
<li>尝试清除浏览器的缓存和 cookie，然后重试。</li>
<li>检查您是否在请求标头中使用了正确的 API 密钥。</li>
<li>如果您不确定您的 API 密钥是否正确，您可以<a href="https://platform.openai.com/account/api-keys" target="_blank" rel="noopener noreferrer">生成一个新密钥</a>。确保替换代码库中的旧 API 密钥并遵循我们的<a href="https://help.openai.com/en/articles/5112595-best-practices-for-api-key-safety" target="_blank" rel="noopener noreferrer">最佳实践指南</a>。</li>
</ul>
</details>
<details class="hint-container details"><summary>401 - 您必须是组织的成员才能使用 API</summary>
<p>此错误消息表明您的帐户不属于某个组织。发生这种情况的原因可能有多种，例如：</p>
<ul>
<li>您已经离开或被从以前的组织中移除。</li>
<li>您的组织已被删除。</li>
</ul>
<p>要解决此错误，请执行以下步骤：</p>
<ul>
<li>如果您已经离开或被从以前的组织中移除，您可以申请一个新组织或受邀加入现有组织。</li>
<li>要申请新组织，请通过 help.openai.com 联系我们</li>
<li><a href="https://platform.openai.com/account/members" target="_blank" rel="noopener noreferrer">现有的组织所有者可以通过成员面板</a>邀请您加入他们的组织。</li>
</ul>
</details>
<details class="hint-container details"><summary>429 - 达到请求的速率限制</summary>
<p>此错误消息表示您已达到为 API 分配的速率限制。这意味着您在短时间内提交了过多的标记或请求，并且超出了允许的请求数量。发生这种情况的原因可能有多种，例如：</p>
<ul>
<li>您正在使用发出频繁或并发请求的循环或脚本。</li>
<li>您正在与其他用户或应用程序共享您的 API 密钥。</li>
<li>您正在使用具有低速率限制的免费计划。</li>
</ul>
<p>要解决此错误，请执行以下步骤：</p>
<ul>
<li>调整您的请求，避免进行不必要或多余的呼叫。</li>
<li>如果您使用的是循环或脚本，请确保实施退避机制或尊重速率限制和响应标头的重试逻辑。您可以在我们的<a href="/guides/%E9%80%9F%E7%8E%87%E9%99%90%E5%88%B6">速率限制指南</a>中详细了解我们的速率限制政策和最佳实践。</li>
<li>如果您与其他用户共享您的组织，请注意限制是按组织而不是按用户应用的。值得检查您团队其他成员的使用情况，因为这会影响限制。</li>
<li>如果您使用的是免费或低级别计划，请考虑升级到提供更高速率限制的现收现付计划。您可以在我们的<a href="/guides/%E9%80%9F%E7%8E%87%E9%99%90%E5%88%B6">速率限制指南</a>中比较每个计划的限制。</li>
</ul>
</details>
<details class="hint-container details"><summary>429 - 您超出了当前配额，请检查您的计划和账单明细</summary>
<p>此错误消息表示您已达到 API 的每月最大支出。您可以在 <a href="https://platform.openai.com/account/billing/limits" target="_blank" rel="noopener noreferrer">账号计费设置</a> 的“hard limit”下查看每月最高限额。这意味着您已经消耗了分配给您的计划的所有积分，并且已经达到了当前账单周期的限制。发生这种情况的原因可能有多种，例如：</p>
<ul>
<li>您正在使用消耗大量信用或代币的大容量或复杂服务。</li>
<li>对于您的组织的使用，您的限制设置得太低。</li>
</ul>
<p>要解决此错误，请执行以下步骤：</p>
<ul>
<li>在您的<a href="https://platform.openai.com/account/billing/limits" target="_blank" rel="noopener noreferrer">帐户设置</a>中检查您当前的配额。您可以在帐户的<a href="https://platform.openai.com/account/usage" target="_blank" rel="noopener noreferrer">使用部分</a>查看您的请求消耗了多少标记。</li>
<li>如果您使用的是免费计划，请考虑升级到提供更高配额的现收现付计划。</li>
<li>如果您需要增加配额，您可以<a href="https://platform.openai.com/forms/quota-increase" target="_blank" rel="noopener noreferrer">申请一个</a>并提供有关预期使用情况的相关详细信息。我们将审核您的请求并在大约 7-10 个工作日内回复您。</li>
</ul>
</details>
<details class="hint-container details"><summary>429 - 引擎当前超载，请稍后再试</summary>
<p>此错误消息表明我们的服务器流量过大，目前无法处理您的请求。发生这种情况的原因可能有多种，例如：</p>
<ul>
<li>对我们服务的需求突然激增。</li>
<li>我们的服务器有计划或计划外的维护或更新。</li>
<li>我们的服务器发生意外或不可避免的中断或事件。</li>
</ul>
<p>要解决此错误，请执行以下步骤：</p>
<ul>
<li>稍等片刻后重试您的请求。我们建议使用指数退避策略或尊重响应标头和速率限制的重试逻辑。您可以阅读更多关于我们的速率限制<a href="https://help.openai.com/en/articles/6891753-rate-limit-advice" target="_blank" rel="noopener noreferrer">最佳实践的</a>信息。</li>
<li>查看我们的<a href="https://status.openai.com/" target="_blank" rel="noopener noreferrer">状态页面</a>，了解有关我们的服务和服务器的任何更新或公告。</li>
<li>如果在合理的时间后您仍然收到此错误，请联系我们以获得进一步的帮助。对于给您带来的不便，我们深表歉意，感谢您的耐心等待和理解。</li>
</ul>
</details>
<h2 id="python-库错误类型" tabindex="-1"><a class="header-anchor" href="#python-库错误类型"><span>Python 库错误类型</span></a></h2>
<table>
<thead>
<tr>
<th style="text-align:left">类型</th>
<th style="text-align:left">概述</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:left">APIError</td>
<td style="text-align:left"><strong>原因</strong>：我们这边的问题。 <br><strong>解决方案</strong>：稍等片刻后重试您的请求，如果问题仍然存在，请联系我们。</td>
</tr>
<tr>
<td style="text-align:left">Timeout</td>
<td style="text-align:left"><strong>原因</strong>：请求超时。 <br /><strong>解决方案</strong>：**稍等片刻后重试您的请求，如果问题仍然存在，请联系我们。</td>
</tr>
<tr>
<td style="text-align:left">RateLimitError</td>
<td style="text-align:left"><strong>原因</strong>：您已达到指定的速率限制。<br /> <strong>解决方案</strong>：调整您的请求。在我们的<a href="/guides/%E9%80%9F%E7%8E%87%E9%99%90%E5%88%B6">速率限制指南</a>中阅读更多内容。</td>
</tr>
<tr>
<td style="text-align:left">APIConnectionError</td>
<td style="text-align:left"><strong>原因</strong>：连接到我们的服务时出现问题。<br /> <strong>解决方案</strong>：检查您的网络设置、代理配置、SSL 证书或防火墙规则。</td>
</tr>
<tr>
<td style="text-align:left">InvalidRequestError</td>
<td style="text-align:left"><strong>原因</strong>：您的请求格式错误或缺少一些必需的参数，例如令牌或输入。 <br /><strong>解决方案</strong>：错误消息应告知您所犯的具体错误。检查您正在调用的特定 API 方法的<RouteLink to="/api/">文档</RouteLink>，并确保您发送的参数有效且完整。您可能还需要检查请求数据的编码、格式或大小。</td>
</tr>
<tr>
<td style="text-align:left">AuthenticationError</td>
<td style="text-align:left"><strong>原因</strong>：您的 API 密钥或令牌无效、过期或已撤销。 <br /><strong>解决方案</strong>：检查您的 API 密钥或令牌并确保其正确且有效。您可能需要从您的帐户信息中心生成一个新的。</td>
</tr>
<tr>
<td style="text-align:left">ServiceUnavailableError</td>
<td style="text-align:left"><strong>原因</strong>：我们的服务器出现问题。 <br /><strong>解决方案</strong>：稍等片刻后重试您的请求，如果问题仍然存在，请联系我们。检查<a href="https://status.openai.com/" target="_blank" rel="noopener noreferrer">状态页面</a>。</td>
</tr>
</tbody>
</table>
<details class="hint-container details"><summary>APIError</summary>
<p><code v-pre>APIError</code> 表示我们在处理您的请求时出了点问题。这可能是由于临时错误、错误或系统中断造成的。</p>
<p>对于给您带来的任何不便，我们深表歉意，我们正在努力尽快解决任何问题。您可以<a href="https://status.openai.com/" target="_blank" rel="noopener noreferrer">查看我们的系统状态页面</a>以获取更多信息。</p>
<p>如果您遇到<code v-pre>APIError</code>，请尝试以下步骤：</p>
<ul>
<li>等待几秒钟，然后重试您的请求。有时，问题可能会很快得到解决，您的请求可能会在第二次尝试时成功。</li>
<li>查看我们的状态页面，了解任何可能影响我们服务的持续事件或维护。如果有活动事件，请关注更新并等到问题解决后再重试您的请求。</li>
<li>如果问题仍然存在，请查看我们的持续性错误后续步骤部分。</li>
</ul>
<p>我们的支持团队将调查此问题并尽快回复您。请注意，由于需求量大，我们的支持排队时间可能会很长。您也可以<a href="https://community.openai.com/" target="_blank" rel="noopener noreferrer">在我们的社区论坛中发帖</a>，但请务必省略任何敏感信息。</p>
</details>
<details class="hint-container details"><summary>Timeout</summary>
<p>“超时”错误表示您的请求完成时间过长，我们的服务器关闭了连接。这可能是由于网络问题、我们的服务负载过重或需要更多处理时间的复杂请求。</p>
<p>如果遇到<code v-pre>Timeout</code>错误，请尝试以下步骤：</p>
<ul>
<li>等待几秒钟，然后重试您的请求。有时，网络拥塞或我们服务的负载可能会减少，您的请求可能会在第二次尝试时成功。</li>
<li>检查您的网络设置并确保您拥有稳定快速的互联网连接。您可能需要切换到不同的网络、使用有线连接或减少使用带宽的设备或应用程序的数量。</li>
<li>如果问题仍然存在，请查看我们的持续错误后续步骤部分。</li>
</ul>
</details>
<details class="hint-container details"><summary>RateLimitError</summary>
<p><code v-pre>RateLimitError</code> 表示您已达到指定的速率限制。这意味着您在给定时间段内发送了过多的标记或请求，我们的服务已暂时阻止您发送更多。</p>
<p>我们施加速率限制以确保公平有效地使用我们的资源并防止滥用或超载我们的服务。</p>
<p>如果您遇到<code v-pre>RateLimitError</code>，请尝试以下步骤：</p>
<ul>
<li>发送更少的标记或请求或放慢速度。您可能需要减少请求的频率或数量、批处理标记或实施指数退避。您可以阅读我们的<a href="/guides/%E9%80%9F%E7%8E%87%E9%99%90%E5%88%B6">速率限制指南</a>了解更多详情。</li>
<li>等到您的速率限制重置（一分钟）并重试您的请求。错误消息应该让您了解您的使用率和允许的使用情况。</li>
<li>您还可以从您的帐户信息中心查看您的 API 使用统计信息。</li>
</ul>
</details>
<details class="hint-container details"><summary>APIConnectionError</summary>
<p><code v-pre>APIConnectionError</code> 表示您的请求无法到达我们的服务器或无法建立安全连接。这可能是由于网络问题、代理配置、SSL 证书或防火墙规则造成的。</p>
<p>如果您遇到<code v-pre>APIConnectionError</code>，请尝试以下步骤：</p>
<ul>
<li>检查您的网络设置并确保您拥有稳定快速的互联网连接。您可能需要切换到不同的网络、使用有线连接或减少使用带宽的设备或应用程序的数量。</li>
<li>检查您的代理配置并确保它与我们的服务兼容。您可能需要更新代理设置、使用不同的代理或完全绕过代理。</li>
<li>检查您的 SSL 证书并确保它们有效且是最新的。您可能需要安装或更新证书、使用不同的证书颁发机构或禁用 SSL 验证。</li>
<li>检查您的防火墙规则并确保它们没有阻止或过滤我们的服务。您可能需要修改防火墙设置。</li>
<li>如果合适，请检查您的容器是否具有发送和接收流量的正确权限。</li>
<li>如果问题仍然存在，请查看我们的持续错误后续步骤部分。</li>
</ul>
</details>
<details class="hint-container details"><summary>InvalidRequestError</summary>
<p>表示您的<code v-pre>InvalidRequestError</code>请求格式不正确或缺少某些必需的参数，例如标记或输入。这可能是由于代码中的拼写错误、格式错误或逻辑错误。</p>
<p>如果您遇到<code v-pre>InvalidRequestError</code>，请尝试以下步骤：</p>
<ul>
<li>仔细阅读错误消息并确定具体的错误。错误消息应告知您哪些参数无效或丢失，以及预期的值或格式。</li>
<li>查看<RouteLink to="/api/">API 参考</RouteLink>以了解您正在调用的特定 API 方法，并确保您发送的参数有效且完整。您可能需要查看参数名称、类型、值和格式，并确保它们与文档相符。</li>
<li>检查您请求数据的编码、格式或大小，并确保它们与我们的服务兼容。您可能需要以 UTF-8 编码您的数据，以 JSON 格式化您的数据，或者如果数据太大则压缩您的数据。</li>
<li>使用 Postman 或 curl 等工具测试您的请求，并确保它按预期工作。您可能需要调试代码并修复请求逻辑中的任何错误或不一致。</li>
<li>如果问题仍然存在，请查看我们的持续错误后续步骤部分。</li>
</ul>
</details>
<details class="hint-container details"><summary>AuthenticationError</summary>
<p><code v-pre>AuthenticationError</code> 表示您的 API 密钥或标记无效、过期或已撤销。这可能是由于拼写错误、格式错误或安全漏洞造成的。</p>
<p>如果您遇到<code v-pre>AuthenticationError</code>，请尝试以下步骤：</p>
<ul>
<li>检查您的 API 密钥或标记并确保其正确且有效。您可能需要从 API 密钥仪表板生成一个新密钥，确保没有多余的空格或字符，或者如果您有多个密钥或标记，则使用不同的密钥或标记。</li>
<li>确保您遵循了正确的格式。</li>
</ul>
</details>
<details class="hint-container details"><summary>ServiceUnavailableError</summary>
<p><code v-pre>ServiceUnavailableError</code> 表示我们的服务器暂时无法处理您的请求。这可能是由于计划内或计划外维护、系统升级或服务器故障所致。这些错误也可以在高流量期间返回。</p>
<p>对于给您带来的不便，我们深表歉意，我们正在努力尽快恢复我们的服务。</p>
<p>如果您遇到<code v-pre>ServiceUnavailableError</code>，请尝试以下步骤：</p>
<ul>
<li>等待几分钟，然后重试您的请求。有时，问题可能会很快得到解决，您的请求可能会在下一次尝试时成功。</li>
<li>查看我们的<a href="https://status.openai.com/" target="_blank" rel="noopener noreferrer">状态页面</a>，了解任何可能影响我们服务的持续事件或维护。如果有活动事件，请关注更新并等到问题解决后再重试您的请求。</li>
<li>如果问题仍然存在，请查看我们的持续错误后续步骤部分。</li>
<li></li>
</ul>
</details>
<h3 id="持续性错误" tabindex="-1"><a class="header-anchor" href="#持续性错误"><span>持续性错误</span></a></h3>
<p>如果问题仍然存在，请<a href="https://help.openai.com/en/" target="_blank" rel="noopener noreferrer">通过聊天联系我们的支持团队</a>并向他们提供以下信息：</p>
<ul>
<li>您使用的型号</li>
<li>您收到的错误消息和代码</li>
<li>您发送的请求数据和标头</li>
<li>您请求的时间戳和时区</li>
<li>任何其他可能有助于我们诊断问题的相关详细信息</li>
</ul>
<p>我们的支持团队将调查此问题并尽快回复您。请注意，由于需求量大，我们的支持排队时间可能会很长。您也可以<a href="https://community.openai.com/" target="_blank" rel="noopener noreferrer">在我们的社区论坛中发帖，</a>但请务必省略任何敏感信息。</p>
<h3 id="处理错误" tabindex="-1"><a class="header-anchor" href="#处理错误"><span>处理错误</span></a></h3>
<p>我们建议您以编程方式处理 API 返回的错误。为此，您可能需要使用如下代码片段：</p>
<div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py" data-title="py"><pre v-pre><code><span class="line"><span class="token keyword">try</span><span class="token punctuation">:</span></span>
<span class="line">  <span class="token comment"># 在这里提出您的 OpenAI API 请求</span></span>
<span class="line">  response <span class="token operator">=</span> openai<span class="token punctuation">.</span>Completion<span class="token punctuation">.</span>create<span class="token punctuation">(</span>prompt<span class="token operator">=</span><span class="token string">"Hello world"</span><span class="token punctuation">,</span></span>
<span class="line">                                      model<span class="token operator">=</span><span class="token string">"text-davinci-003"</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token keyword">except</span> openai<span class="token punctuation">.</span>error<span class="token punctuation">.</span>APIError <span class="token keyword">as</span> e<span class="token punctuation">:</span></span>
<span class="line">  <span class="token comment"># 在此处处理 API 错误，例如重试或记录</span></span>
<span class="line">  <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"OpenAI API returned an API Error: </span><span class="token interpolation"><span class="token punctuation">{</span>e<span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span></span>
<span class="line">  <span class="token keyword">pass</span></span>
<span class="line"><span class="token keyword">except</span> openai<span class="token punctuation">.</span>error<span class="token punctuation">.</span>APIConnectionError <span class="token keyword">as</span> e<span class="token punctuation">:</span></span>
<span class="line">  <span class="token comment"># 在这里处理连接错误</span></span>
<span class="line">  <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"Failed to connect to OpenAI API: </span><span class="token interpolation"><span class="token punctuation">{</span>e<span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span></span>
<span class="line">  <span class="token keyword">pass</span></span>
<span class="line"><span class="token keyword">except</span> openai<span class="token punctuation">.</span>error<span class="token punctuation">.</span>RateLimitError <span class="token keyword">as</span> e<span class="token punctuation">:</span></span>
<span class="line">  <span class="token comment"># 处理速率限制错误（我们建议使用指数退避）</span></span>
<span class="line">  <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"OpenAI API request exceeded rate limit: </span><span class="token interpolation"><span class="token punctuation">{</span>e<span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">)</span></span>
<span class="line">  <span class="token keyword">pass</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


