---
title: nextjs 13知识点
---

## SSR
> 1. nextjs 13 积极适配react18的特性，并且服务端的渲染是返回的是二进制的流的数据，(stream)，在之前的SSR 是属于返回的是字符串数据。
> 2. nextjs 13 全新的 fetch 方法，并且支持服务端请求数据，具体自己看一下 nextjs 的官网，下面展示两个服务端获取graphql数据的写法：

### use 的方式
```jsx
import { use } from 'react';
import {
  AllStockListQuery,
  AllStockListDocument,
  StockBasicList,
} from '@/lib/gql/graphql';
import { gqlClient } from '@/lib/service/client';

const getData = () => {
  return new Promise((resolve) => {
    gqlClient
      .request(AllStockListDocument, {
        name: '',
        pageIndex: 1,
        pageSize: 10,
      })
      .then((data) => {
        return resolve(data?.allStockList);
      });
  });
};

export default function RenderStock() {
  const data = use(getData()); // 参数的接收一个promise函数

  return <p className="overflow-hidden text-white">{JSON.stringify(data)}</p>;
}
```

### async 和 await 方式
```jsx
import { use } from 'react';
import {
  AllStockListQuery,
  AllStockListDocument,
  StockBasicList,
} from '@/lib/gql/graphql';
import { gqlClient } from '@/lib/service/client';

export default async function RenderStock() {
  const res = await gqlClient.request(AllStockListDocument, {
    name: '',
    pageIndex: 1,
    pageSize: 10,
  });

  return (
    <p className="overflow-hidden text-white">
      {JSON.stringify(res?.allStockList)}
    </p>
  );
}
```