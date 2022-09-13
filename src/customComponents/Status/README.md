```js
export interface IStatus {
  status:
    | 'not-started'
    | 'processing'
    | 'completed'
    | 'pause'
    | 'out-of-date'
    | 'delete'
    | 'probation'
    | 'official-staff'
    | 'quit';
}

<Status status={REQUEST_STATUS.NOT_STARTED ......}/>;
```
