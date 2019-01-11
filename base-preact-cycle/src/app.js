import { h, render } from 'preact-cycle';

const SET_NEW_TEXT = (_, list, value) => {
  console.log({list, value});
  list.newText = value.target.value;
};

const ADD_NEW_TEXT = (_, list) => {
  if (list.newText !== '') list.items.push(list.newText);
  list.newText = '';
};

const Tracker = ({tracker:{items, inputText}}, {mutation}) => (
  <tracker>
    {items.map(item => <item>{item}</item>)}
    <TrackerInput inputText={inputText} />
  </tracker>
);

const TrackerInput = ({inputText}, {mutation}) => (
  <tracker-input>
    <form onSubmit={mutation(ADD_TRACKER_ITEM)} action="javascript:">
      <input placeholder="New item..." value={inputText} onInput={mutation(SET_TRACKER_TEXT)} autoFocus />
    </form>
  </tracker-input>
);

const Info = ({items}, {info: {metrics}}) => (
  <info>
    <headers>
      {metrics.map(metric => <Metric metric={metric} />)}
    </headers>
    <bars>
      {metrics.map(metric => <Bar value={Math.random() * 100} />)}
    </bars>
  </info>
);

const Metric = ({metric: {name, units}}) => (
  <metric>{name} ({units[0]})</metric>
);

const Bar = ({value}) => (
  <bar style={{'height': `${value}%`}}>bar</bar>
);

const SideBySide = ({tracker, info}) => (
  <side-by-side>
    <Tracker tracker={tracker} />
    <Info info={info} />
  </side-by-side>
);

const ListConstructor = ({list}, {mutation}) => (
  <list-constructor>
    <List items={list.items} />
    <input type="text" placeholder="New Text To Add" value={list.newText} onInput={mutation(SET_NEW_TEXT, list)} autoFocus />
    <button onClick={mutation(ADD_NEW_TEXT, list)}>Add</button>
  </list-constructor>
);

const List = ({items}) => (
  <list>
    {items.map(item => <ListItem item={item} />)}
  </list>
);

const ListItem = ({item}) => (
  <list-item>
    {item}
  </list-item>
);

render(ListConstructor, {list:{items:[], newText: ''}}, document.body);