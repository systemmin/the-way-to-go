# [如何构建可以回答有关您网站的问题的 AI](https://platform.openai.com/docs/tutorials/web-qa-embeddings/how-to-build-an-ai-that-can-answer-questions-about-your-website)

本教程介绍了一个简单的网站抓取示例（在本示例中为 OpenAI 网站），使用[Embeddings API](https://platform.openai.com/docs/guides/embeddings)将抓取的页面转换为嵌入，然后创建一个基本的搜索功能，允许用户询问有关嵌入信息的问题. 这旨在成为使用自定义知识库的更复杂应用程序的起点。



## 入门

Python 和 GitHub 的一些基础知识对本教程很有帮助。在深入研究之前，请确保[设置一个 OpenAI API 密钥](https://platform.openai.com/docs/api-reference/introduction)并完成[快速入门教程](快速开始.md)。这将为如何充分发挥 API 的潜力提供良好的直觉。

Python 与 OpenAI、Pandas、transformers、NumPy 和其他流行的程序包一起用作主要的编程语言。如果您在学习本教程时遇到任何问题，请在[OpenAI 社区论坛](https://community.openai.com/)上提问。

[要从代码开始，请在 GitHub 上](https://github.com/openai/openai-cookbook/tree/main/solutions/web_crawl_Q%26A)克隆本教程的完整代码。或者，跟随并将每个部分复制到 Jupyter 笔记本中并逐步运行代码，或者只是阅读。避免任何问题的一个好方法是设置一个新的虚拟环境并通过运行以下命令安装所需的包：

```bash
python -m venv env

source env/bin/activate

pip install -r requirements.txt
```

## 设置网络爬虫

本教程的主要重点是 OpenAI API，因此如果您愿意，可以跳过有关如何创建网络爬虫的上下文并直接[下载源代码](https://github.com/openai/openai-cookbook/tree/main/solutions/web_crawl_Q%26A)。否则，请展开下面的部分以完成抓取机制的实施。

### 了解如何构建网络爬虫

#### 构建嵌入索引

> 以文本形式获取数据是使用嵌入的第一步。本教程通过爬取 OpenAI 网站创建一组新数据，您也可以将这种技术用于您自己的公司或个人网站
>
> [查看源代码](https://github.com/openai/openai-cookbook/tree/main/solutions/web_crawl_Q%26A)



<img src="https://cdn.openai.com/API/docs/images/tutorials/web-qa/DALL-E-woman-turning-a-stack-of-papers-into-numbers-pixel-art.png" alt="DALL-E：女人把一叠纸变成数字像素艺术" style="zoom:25%;" />

CSV 是存储嵌入的常用格式。您可以通过将原始文本文件（位于文本目录中）转换为 Pandas 数据帧来将此格式与 Python 结合使用。Pandas 是一个流行的开源库，可帮助您处理表格数据（存储在行和列中的数据）。

空白空行会使文本文件混乱并使它们更难处理。一个简单的函数可以删除这些行并整理文件。

```python
def remove_newlines(serie):
    serie = serie.str.replace('\n', ' ')
    serie = serie.str.replace('\\n', ' ')
    serie = serie.str.replace('  ', ' ')
    serie = serie.str.replace('  ', ' ')
    return serie
```

将文本转换为 CSV 需要循环访问之前创建的文本目录中的文本文件。打开每个文件后，删除多余的间距并将修改后的文本附加到列表中。然后，将删除了新行的文本添加到空的 Pandas 数据框中，并将数据框写入 CSV 文件。

额外的间距和新行会使文本混乱并使嵌入过程复杂化。此处使用的代码有助于删除其中一些字符，但您可能会发现第 3 方库或其他方法有助于删除更多不必要的字符。

```python
import pandas as pd

#  创建一个列表来存储文本文件
texts=[]

# 获取text目录下的所有文本文件
for file in os.listdir("text/" + domain + "/"):

    # 打开文件并读取文本
    with open("text/" + domain + "/" + file, "r", encoding="UTF-8") as f:
        text = f.read()

        # 省略前 11 行和后 4 行，然后将 -、_ 和 #update 替换为空格。
        texts.append((file[11:-4].replace('-',' ').replace('_', ' ').replace('#update',''), text))

# 从文本列表中创建一个数据框
df = pd.DataFrame(texts, columns = ['fname', 'text'])

# 将文本列设置为删除换行符的原始文本
df['text'] = df.fname + ". " + remove_newlines(df.text)
df.to_csv('processed/scraped.csv')
df.head()
```

将原始文本保存到 CSV 文件后的下一步是标记化。此过程通过分解句子和单词将输入文本拆分为标记。[通过查看](https://platform.openai.com/tokenizer)文档中的 Tokenizer可以看到对此的可视化演示。

> 一个有用的经验法则是，对于普通英文文本，一个标记通常对应于 ~4 个字符的文本。这相当于大约 ¾ 个单词（因此 100 个标记 ~= 75 个单词）。

API 对嵌入的输入标记的最大数量有限制。要保持在限制以下，CSV 文件中的文本需要分成多行。将首先记录每一行的现有长度，以确定需要拆分哪些行。

```python
import tiktoken

# 加载设计用于 ada-002 模型的 cl100k_base 分词器
tokenizer = tiktoken.get_encoding("cl100k_base")

df = pd.read_csv('processed/scraped.csv', index_col=0)
df.columns = ['title', 'text']

# 标记文本并将标记数保存到新列
df['n_tokens'] = df.text.apply(lambda x: len(tokenizer.encode(x)))

# 使用直方图可视化每行标记数量的分布
df.n_tokens.hist()
```

![嵌入直方图](https://cdn.openai.com/API/docs/images/tutorials/web-qa/embeddings-initial-histrogram.png)

最新的嵌入模型可以处理多达 8191 个输入标记的输入，因此大多数行不需要任何分块，但对于每个被抓取的子页面来说可能并非如此，因此下一个代码块会将较长的行拆分为较小的块。

```Python
max_tokens = 500

# 将文本拆分为最大数量的标记块的函数
def split_into_many(text, max_tokens = max_tokens):

    # 将文本拆分成句子
    sentences = text.split('. ')

    # 获取每个句子的标记个数
    n_tokens = [len(tokenizer.encode(" " + sentence)) for sentence in sentences]
    
    chunks = []
    tokens_so_far = 0
    chunk = []

    # 遍历在一个元组中连接在一起的句子和标记
    for sentence, token in zip(sentences, n_tokens):

        # 如果到目前为止的标记数加上当前句子中的标记数更大
        # 超过最大标记数，然后将块添加到块列表并重置
        # 到目前为止的块和标记
        if tokens_so_far + token > max_tokens:
            chunks.append(". ".join(chunk) + ".")
            chunk = []
            tokens_so_far = 0

        # 如果当前句子中的标记个数大于最大个数
        # 标记, 进入下一句
        if token > max_tokens:
            continue

        # 否则，将句子添加到块中，并将标记数添加到总数中
        chunk.append(sentence)
        tokens_so_far += token + 1

    return chunks
    

shortened = []

#  循环遍历 dataframe
for row in df.iterrows():

    # 如果文本为无，则转到下一行
    if row[1]['text'] is None:
        continue

    # 如果标记数大于最大标记数，将文本拆分成块
    if row[1]['n_tokens'] > max_tokens:
        shortened += split_into_many(row[1]['text'])
    
    # 否则，将文本添加到缩短文本列表中
    else:
        shortened.append( row[1]['text'] )
```

再次可视化更新后的直方图有助于确认行是否已成功拆分为缩短的部分。

```python
df = pd.DataFrame(shortened, columns = ['text'])
df['n_tokens'] = df.text.apply(lambda x: len(tokenizer.encode(x)))
df.n_tokens.hist()
```

![嵌入标记化输出](https://cdn.openai.com/API/docs/images/tutorials/web-qa/embeddings-tokenized-output.png)

内容现在被分解成更小的块，可以向 OpenAI API 发送一个简单的请求，指定使用新的 `text-embedding-ada-002` 模型来创建嵌入：

```python
import openai

df['embeddings'] = df.text.apply(lambda x: openai.Embedding.create(input=x, engine='text-embedding-ada-002')['data'][0]['embedding'])

df.to_csv('processed/embeddings.csv')
df.head()
```

这大约需要 3-5 分钟，但之后您就可以使用嵌入了！

#### 使用嵌入构建问答系统

<img src="https://cdn.openai.com/API/docs/images/tutorials/web-qa/DALL-E-friendly-robot-question-and-answer-system-pixel-art.png" alt="DALL-E：友好的机器人问答系统像素艺术" style="zoom:25%;" />

> 嵌入已准备就绪，此过程的最后一步是创建一个简单的问答系统。这将接受用户的问题，创建它的嵌入，并将其与现有嵌入进行比较，以从抓取的网站中检索最相关的文本。然后，`text-davinci-003` 模型将根据检索到的文本生成听起来自然的答案。

------

将嵌入转换为 NumPy 数组是第一步，考虑到在 NumPy 数组上运行的许多可用函数，这将在如何使用它方面提供更大的灵活性。它还会将维度展平为一维，这是许多后续操作所需的格式。

```python
import numpy as np
from openai.embeddings_utils import distances_from_embeddings

df=pd.read_csv('processed/embeddings.csv', index_col=0)
df['embeddings'] = df['embeddings'].apply(eval).apply(np.array)

df.head()
```

现在数据已准备就绪，需要将问题转换为具有简单函数的嵌入。这很重要，因为嵌入搜索使用余弦距离比较数字向量（这是原始文本的转换）。这些向量可能相关，如果它们的余弦距离接近，则可能是问题的答案。OpenAI python 包有一个内置`distances_from_embeddings`函数，在这里很有用。

```python
def create_context(
    question, df, max_len=1800, size="ada"
):
    """
    通过从数据框中找到最相似的上下文来为问题创建上下文
    """

    # 获取问题的 embedding
    q_embeddings = openai.Embedding.create(input=question, engine='text-embedding-ada-002')['data'][0]['embedding']

    #  获取与 embedding 的距离
    df['distances'] = distances_from_embeddings(q_embeddings, df['embeddings'].values, distance_metric='cosine')


    returns = []
    cur_len = 0

    # 按距离排序，将文本添加到上下文中，直到上下文太长
    for i, row in df.sort_values('distances', ascending=True).iterrows():
        
        # 将文本的长度添加到当前长度
        cur_len += row['n_tokens'] + 4
        
        # 如果上下文太长，中断
        if cur_len > max_len:
            break
        
        # 否则将其添加到要返回的文本中
        returns.append(row["text"])

    # 返回内容
    return "\n\n###\n\n".join(returns)
```

文本被分解成更小的标记集，因此按升序循环并继续添加文本是确保完整答案的关键步骤。如果返回的内容多于所需，也可以将 max_len 修改为更小的值。

上一步只检索了与问题语义相关的文本块，因此它们可能包含答案，但不能保证。通过返回前 5 个最有可能的结果，可以进一步增加找到答案的机会。

然后，回答提示将尝试从检索到的上下文中提取相关事实，以便形成连贯的答案。如果没有相关答案，提示将返回“我不知道”。

可以使用完成端点创建问题的真实答案`text-davinci-003`。

```python
def answer_question(
    df,
    model="text-davinci-003",
    question="可以在没有人工审核的情况下将模型输出发布到 Twitter 吗？",
    max_len=1800,
    size="ada",
    debug=False,
    max_tokens=150,
    stop_sequence=None
):
    """
    根据数据框文本中最相似的上下文回答问题
    """
    context = create_context(
        question,
        df,
        max_len=max_len,
        size=size,
    )
    # 如果调试，打印原始模型响应
    if debug:
        print("Context:\n" + context)
        print("\n\n")

    try:
        # 使用问题和上下文创建一个补全
        response = openai.Completion.create(
            prompt=f"根据下面的上下文回答问题，如果根据上下文不能回答问题，就说“我不知道”\n\n上下文：{context}\n\n- --\n\n问题：{问题}\n答案：",
            temperature=0,
            max_tokens=max_tokens,
            top_p=1,
            frequency_penalty=0,
            presence_penalty=0,
            stop=stop_sequence,
            model=model,
        )
        return response["choices"][0]["text"].strip()
    except Exception as e:
        print(e)
        return ""
```

完成了！一个工作的 Q/A 系统已经准备就绪，该系统具有从 OpenAI 网站嵌入的知识。可以进行一些快速测试以查看输出质量：

```python
answer_question(df, question="今天是什么日子？", debug=False)

answer_question(df, question="我们最新的嵌入模型是什么?")

answer_question(df, question="什么是 ChatGPT ?")
```

响应将类似于以下内容：

```response
"我不知道。"

'最新的嵌入模型是 text-embedding-ada-002。'

‘ChatGPT 是一种训练有素的以对话方式进行交互的模型。它能够回答后续问题、承认错误、挑战不正确的前提并拒绝不适当的请求'
```

如果系统无法回答预期的问题，则值得搜索原始文本文件以查看预期已知的信息是否最终被嵌入。最初完成的爬网过程被设置为跳过所提供的原始域之外的站点，因此如果有子域设置，它可能不知道这些信息。

目前，每次都传入数据框来回答问题。对于更多的生产工作流程，应该使用[矢量数据库]((https://platform.openai.com/docs/guides/embeddings/how-can-i-retrieve-k-nearest-embedding-vectors-quickly))解决方案而不是将嵌入存储在 CSV 文件中，但当前的方法是原型制作的一个很好的选择。

