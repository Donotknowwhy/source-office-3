# Example:

```js
interface TOfButtonAction {
  value: string;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
  action?: string;
  className?: string;
  disableSpacingRight?: boolean;
}

<ButtonAction
  iconLeft={<FilterIcon />}
  value="hehe" //text
  disableSpacingRight={true} //default false
  action={ACTION_BUTTON.DELETE || ADD_NEW ...} // exam
/>;
```
