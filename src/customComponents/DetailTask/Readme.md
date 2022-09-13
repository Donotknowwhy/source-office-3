# Example:

```js
const [open, setOpen] = useState(true);

const handleClose = () => {
  setOpen(false);
};

<DetailTask visible={open} onClose={handleClose} />;
```
