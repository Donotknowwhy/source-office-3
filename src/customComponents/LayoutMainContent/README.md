// const tabList = [
// {
// key: 'tab1',
// tab: 'Công việc cá nhân'
// },
// {
// key: 'tab2',
// tab: 'Dự án'
// }
// ];

// const contentList = {
// tab1: <p>content1</p>,
// tab2: <p>content2</p>
// };

const [activeTabKey, setActiveTabKey] = useState<string>('tab1');

<LayoutMainContent
        tabList={tabList}
        activeTabKey={activeTabKey}
        setActiveTabKey={setActiveTabKey}
        noPaddingLeftAndRight?={boolean}
      >
{contentList[activeTabKey]}
</LayoutMainContent>
