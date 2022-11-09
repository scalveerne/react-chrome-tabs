# React Chrome Tabs

![](./react-chrome-tabs.gif)


## Usage

```ts
import { Tabs } from '@sinm/react-chrome-tabs';

const tabs = useState([{ id: "abc", title: "测试", active: true }])

const active = () => {

}

<Tabs
  onTabActivated={active}
  onTabReorder={reorder}
  onTabClosed={remove}
  onContextMenu={handleContextMenu}
  tabs={tabs}
></Tabs>
```

## Examples

[ONote Tabs](https://github.com/pansinm/ONote/blob/master/packages/renderer/src/main/containers/ResourceTabs/index.tsx)
