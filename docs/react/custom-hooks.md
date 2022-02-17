---
title: 自定义hooks
---

## useFetch
> - 自定义请求的方法，实现组件卸载的时候终止发送请求
> - AbortController 用来终止请求
---

```typescript
export const useFetch = <T>(config: Request, deps: T[]) => {
  const abortController = new AbortController();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState() as any;
  useEffect(() => {
    setLoading(true);
    fetch({
      ...config,
      signal: abortController.signal
    })
      .then(setResult)
      .finally(() => setLoading(false));
  }, deps);

  useEffect(() => {
    return () => {
      abortController.abort();
    }
  }, []);
  return {result, loading} as const;
};
```

## hooks中的深层依赖
```typescript
const getAge = () => {
  return {
    age: 12
  }
};
useEffect(() => {
  console.log(getAge());
}, [getAge()]);
```
> - 上述的代码有个之致命的缺点，每次依赖中 getAge() 都会返回一个新的对象作为依赖，
> 所以导致循环引用，effect 无限更新。
> - 解决上述问题：将对象类型变为普通的类型，比如：字符串

---
```typescript
const getAge = () => {
  return {
    age: 12
  }
};
const age = JSON.stringify(getAge());
useEffect(() => {
  console.log(age);
}, [age]);
```

> - 社区方案是：useDeepCompareEffect
> - 实现的思路是通过 useRef 设置一个普通的基础类型，当使用lodash isEqual 判断两个值不相等的时候
> 将基础类型的值加一，useEffect 依赖这个基础类型，那么就会重新执行
---
```typescript
import { isEqual } from 'lodash';
export function useDeepCompareEffect(fn, deps) {
  const trigger = useRef(0);
  const prevDeps = useRef(deps);
  if (!isEqual(prevDeps.current, deps)) {
    trigger.current++;
  }
  prevDeps.current = deps;
  return useEffect(fn, [trigger.current]);
}
```

## useQuery
> - 将页面的操作同步到URL上，URL发给别人的时候能同步到相同的页面

---
```typescript
export function useQuery() {
  const history = useHistory();
  const { search, pathname } = useLocation();
  // 保存query状态
  const queryState = useRef(qs.parse(search));
  // 设置query
  const setQuery = handler => {
    const nextQuery = handler(queryState.current);
    queryState.current = nextQuery;
    // replace会使组件重新渲染
    history.replace({
      pathname: pathname,
      search: qs.stringify(nextQuery),
    });
  };
  return [queryState.current, setQuery];
}
```

> - 使用栗子：

---
```typescript
const [query, setQuery] = useQuery();

// 接口请求依赖 page 和 size
useEffect(() => {
  api.getUsers();
}, [query.page, query, size]);

// 分页改变 触发接口重新请求
const onPageChange = page => {
  setQuery(prevQuery => ({
    ...prevQuery,
    page,
  }));
};
```
