export const projectDataTest = {
  project: {
    data: [
      {
        id: '1',
        name_project: 'G-Office',
        description: 'phần mềm quản lí doanh nghiệp',
        date_start: '01/01/2023',
        date_create: '21/12/2023',
        deadline: '01/03/2024',
        date_end: '01/02/2023',
        status: 'processcing',
        project_manager: 'Đỗ Trường Giang',
        img_url_avatar_user: '',
        priority: 'high',
        progress: 10,
        detail: [
          {
            member: [
              {
                idUser: 123,
                user_name: 'Dương Xuân Sơn'
              },
              {
                idUser: 124,
                user_name: 'Dương Xuân Sơn'
              },
              {
                idUser: 125,
                user_name: 'Nguyễn Thị Thùy Dương'
              },
              {
                idUser: 126,
                user_name: 'asdasdsad'
              },
              {
                idUser: 127,
                user_name: 'asdasd'
              },
              {
                idUser: 128,
                user_name: 'Dương Xuân Sơn'
              },
              {
                idUser: 129,
                user_name: 'Dương Xuân Sơn'
              },
              {
                idUser: 130,
                user_name: 'Dương Xuân Sơn'
              }
            ],
            progress: 1,
            comments: [
              {
                id: '1',
                img_url_avatar_user: '',
                user_name: 'Hai Tran1',
                update_date: '12:30 20/01/2022',
                comment:
                  'Cần chốt thiết kế trước timeline của chức năng trước 1 tuần nhé 11111.'
              },
              {
                id: '2',
                img_url_avatar_user: '',
                user_name: 'Mr T1',
                update_date: '18:20 20/01/2022',
                comment:
                  'Điều chỉnh nhân sự bên web để đảm bảo tiến độ công việc cho ngày 10/2.'
              }
            ],
            activity: [
              {
                id: '1',
                img_url_avatar_user: '',
                change:
                  '<a className="gx-text-black">Mr T1</a> đã thay đổi trạng thái công việc <a className="gx-text-primary">G01</a> từ <a className="gx-text-primary">Chưa bắt đầu</a> sang <a className="gx-text-primary">Đang thực hiện</a>',
                date_update: '08:20 20/01/2022'
              },
              {
                id: '2',
                img_url_avatar_user: '',
                change:
                  '<a className="gx-text-black">Đỗ Trưởng Giang</a> đã thay đổi  <a className="gx-text-primary">Deadline</a> từ <a className="gx-text-primary">30/12/2022</a> sang <a className="gx-text-primary">31/12/2022</a>',
                date_update: '11:20 20/01/2022'
              }
            ]
          }
        ]
      },
      {
        id: '2',
        name_project: 'Green Farm',
        description: 'Website giới thiệu sản phẩm',
        date_start: '31/12/2023',
        date_create: '19/12/2023',
        deadline: '01/04/2024',
        date_end: '01/03/2023',
        status: 'pause',
        project_manager: 'Đỗ Trường Giang',
        img_url_avatar_user: '',
        priority: 'high',
        progress: 60,
        detail: [
          {
            member: [
              {
                idUser: 123,
                user_name: 'Anh dep trai'
              },
              {
                idUser: 124,
                user_name: 'Anh dep trai12'
              },
              {
                idUser: 125,
                user_name: 'Anh dep trai123'
              },
              {
                idUser: 126,
                user_name: 'asdasdsad'
              },
              {
                idUser: 127,
                user_name: 'asdasd'
              },
              {
                idUser: 128,
                user_name: 'Dương Xuân Sơn'
              },
              {
                idUser: 129,
                user_name: 'Dương Xuân Sơn'
              },
              {
                idUser: 130,
                user_name: 'Dương Xuân Sơn'
              }
            ],
            progress: 1,
            comments: [
              {
                id: '1',
                img_url_avatar_user: '',
                user_name: 'Hai Tran2',
                update_date: '12:30 20/01/2022',
                comment:
                  'Cần chốt thiết kế trước timeline của chức năng trước 1 tuần nhé.'
              },
              {
                id: '2',
                img_url_avatar_user: '',
                user_name: 'Mr T2',
                update_date: '18:20 20/01/2022',
                comment:
                  'Điều chỉnh nhân sự bên web để đảm bảo tiến độ công việc cho ngày 10/2.'
              }
            ],
            activity: [
              {
                id: '1',
                img_url_avatar_user: '',
                change:
                  '<a className="gx-text-black">Dương Xuân Sơn</a> đã thay đổi trạng thái công việc <a className="gx-text-primary">G01</a> từ <a className="gx-text-primary">Chưa bắt đầu</a> sang <a className="gx-text-primary">Đang thực hiện</a>',
                date_update: '08:20 20/01/2022'
              },
              {
                id: '2',
                img_url_avatar_user: '',
                change:
                  '<a className="gx-text-black">Đỗ Trưởng Giang</a> đã thay đổi  <a className="gx-text-primary">Deadline</a> từ <a className="gx-text-primary">30/12/2022</a> sang <a className="gx-text-primary">31/12/2022</a>',
                date_update: '11:20 20/01/2022'
              }
            ]
          }
        ]
      },
      {
        id: '3',
        name_project: 'Luxury Spa',
        description: 'Trang web giới thiệu dịch vụ chăm sóc sắc đẹp',
        date_start: '23/02/2022',
        date_create: '24/12/2023',
        deadline: '25/03/2024',
        date_end: '25/05/2023',
        status: 'not-started',
        project_manager: 'Đỗ Trường Giang',
        img_url_avatar_user: '',
        priority: 'medium',
        progress: 80,

        detail: [
          {
            member: [
              {
                idUser: 123,
                user_name: 'Đỗ trường giang'
              },
              {
                idUser: 124,
                user_name: 'Đỗ trường giang 1'
              },
              {
                idUser: 125,
                user_name: 'Đỗ trường giang 2'
              },
              {
                idUser: 126,
                user_name: 'Đỗ trường giang 3'
              },
              {
                idUser: 127,
                user_name: 'asdasd'
              },
              {
                idUser: 128,
                user_name: 'Dương Xuân Sơn'
              },
              {
                idUser: 129,
                user_name: 'Dương Xuân Sơn'
              },
              {
                idUser: 130,
                user_name: 'Dương Xuân Sơn'
              }
            ],
            progress: 1,
            comments: [
              {
                id: '1',
                img_url_avatar_user: '',
                user_name: 'Hai Tran',
                update_date: '12:30 20/01/2022',
                comment:
                  'Cần chốt thiết kế trước timeline của chức năng trước 1 tuần nhé.'
              },
              {
                id: '2',
                img_url_avatar_user: '',
                user_name: 'Mr T',
                update_date: '18:20 20/01/2022',
                comment:
                  'Điều chỉnh nhân sự bên web để đảm bảo tiến độ công việc cho ngày 10/2.'
              }
            ],
            activity: [
              {
                id: '1',
                img_url_avatar_user: '',
                change:
                  '<a className="gx-text-black">Dương Xuân Sơn</a> đã thay đổi trạng thái công việc <a className="gx-text-primary">G01</a> từ <a className="gx-text-primary">Chưa bắt đầu</a> sang <a className="gx-text-primary">Đang thực hiện</a>',
                date_update: '08:20 20/01/2022'
              },
              {
                id: '2',
                img_url_avatar_user: '',
                change:
                  '<a className="gx-text-black">Đỗ Trưởng Giang</a> đã thay đổi  <a className="gx-text-primary">Deadline</a> từ <a className="gx-text-primary">30/12/2022</a> sang <a className="gx-text-primary">31/12/2022</a>',
                date_update: '11:20 20/01/2022'
              }
            ]
          }
        ]
      },
      {
        id: '4',
        name_project: 'Blue Sea',
        description: 'Ứng dụng di động về chứng khoán',
        date_start: '28/12/2023',
        date_create: '27/12/2023',
        deadline: '25/04/2024',
        date_end: '25/05/2023',
        status: 'pause',
        project_manager: 'Đỗ Trường Giang',
        img_url_avatar_user: '',
        progress: 100,
        priority: 'low',
        detail: [
          {
            member: [
              {
                idUser: 123,
                user_name: 'Đoàn 12'
              },
              {
                idUser: 124,
                user_name: 'Đoàn 123'
              },
              {
                idUser: 125,
                user_name: 'Đỗ trường giang 2'
              },
              {
                idUser: 126,
                user_name: 'Đỗ trường giang 3'
              },
              {
                idUser: 127,
                user_name: 'asdasd'
              },
              {
                idUser: 128,
                user_name: 'Dương Xuân Sơn'
              },
              {
                idUser: 129,
                user_name: 'Dương Xuân Sơn'
              },
              {
                idUser: 130,
                user_name: 'Dương Xuân Sơn'
              }
            ],
            progress: 1,
            comments: [
              {
                id: '1',
                img_url_avatar_user: '',
                user_name: 'Hai Tran',
                update_date: '12:30 20/01/2022',
                comment:
                  'Cần chốt thiết kế trước timeline của chức năng trước 1 tuần nhé.'
              },
              {
                id: '2',
                img_url_avatar_user: '',
                user_name: 'Mr T',
                update_date: '18:20 20/01/2022',
                comment:
                  'Điều chỉnh nhân sự bên web để đảm bảo tiến độ công việc cho ngày 10/2.'
              }
            ],
            activity: [
              {
                id: '1',
                img_url_avatar_user: '',
                change:
                  '<a className="gx-text-black">Nguyễn Tuấn Anh</a> đã thay đổi trạng thái công việc <a className="gx-text-primary">G01</a> từ <a className="gx-text-primary">Chưa bắt đầu</a> sang <a className="gx-text-primary">Đang thực hiện</a>',
                date_update: '08:20 20/01/2022'
              },
              {
                id: '2',
                img_url_avatar_user: '',
                change:
                  '<a className="gx-text-black">Đỗ Trưởng Giang</a> đã thay đổi  <a className="gx-text-primary">Deadline</a> từ <a className="gx-text-primary">30/12/2022</a> sang <a className="gx-text-primary">31/12/2022</a>',
                date_update: '11:20 20/01/2022'
              }
            ]
          }
        ]
      }
    ],
    detail: {
      priority: 'high',
      comments: [
        {
          id: '1',
          img_url_avatar_user: '',
          user_name: 'Hai Tran',
          update_date: '12:30 20/01/2022',
          comment:
            'Cần chốt thiết kế trước timeline của chức năng trước 1 tuần nhé.'
        },
        {
          id: '2',
          img_url_avatar_user: '',
          user_name: 'Mr T',
          update_date: '18:20 20/01/2022',
          comment:
            'Điều chỉnh nhân sự bên web để đảm bảo tiến độ công việc cho ngày 10/2.'
        }
      ],
      activity: [
        {
          id: '1',
          img_url_avatar_user: '',
          change:
            '<a className="gx-text-black">Dương Xuân Sơn</a> đã thay đổi trạng thái công việc <a className="gx-text-primary">G01</a> từ <a className="gx-text-primary">Chưa bắt đầu</a> sang <a className="gx-text-primary">Đang thực hiện</a>',
          date_update: '08:20 20/01/2022'
        },
        {
          id: '2',
          img_url_avatar_user: '',
          change:
            '<a className="gx-text-black">Đỗ Trưởng Giang</a> đã thay đổi  <a className="gx-text-primary">Deadline</a> từ <a className="gx-text-primary">30/12/2022</a> sang <a className="gx-text-primary">31/12/2022</a>',
          date_update: '11:20 20/01/2022'
        }
      ]
    }
  }
};
