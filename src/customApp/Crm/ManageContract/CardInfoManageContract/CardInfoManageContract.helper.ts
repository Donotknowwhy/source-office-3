export const sentContract = [
  {
    idParent: 1,
    title: '',
    detail: [
      {
        id: 1,
        label: 'Email',
        name: 'email',
        placeHolder: 'Nhập email',
        rulesItem: {
          rules: [
            {
              required: true,
              message: 'Vui lòng nhập đầy đủ thông tin'
            }
          ]
        }
      },
      {
        id: 2,
        label: 'Mã hợp đồng',
        placeHolder: 'Nhập mã hợp đồng',
        name: 'price_declaration_code',
        rulesInput: {
          readOnly: true,
          className: 'gx-input-view-only'
        }
      }
    ]
  }
];
