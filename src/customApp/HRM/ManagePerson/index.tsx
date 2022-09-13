import LayoutMainContent from 'customComponents/LayoutMainContent';
import { useState } from 'react';
import SettingDepartment from './SettingDepartment';
import SettingPerson from './SettingPerson';

const tabList = [
  {
    key: 'tab1',
    tab: 'Phân quyền phòng ban'
  },
  {
    key: 'tab2',
    tab: 'Phân quyền cá nhân'
  }
];

const treeData = [
  {
    title: 'HRM',
    key: 'HRM',
    children: [
      {
        title: 'Danh sách nhân sự',
        key: 'HRM.manageHRM',
        children: [
          { title: 'Danh sách nhân sự', key: 'HRM.manageHRM.getListHrm' },
          {
            title: 'Xem thông tin nhân sự',
            key: 'HRM.manageHRM.getGeneralInfor'
          },
          {
            title: 'Tạo mới nhân sự',
            key: 'HRM.manageHRM.createStaffInformation'
          },
          {
            title: 'Cập nhập thông tin nhân sự',
            key: 'HRM.manageHRM.updateGenInfo'
          },
          {
            title: 'Thôi việc nhân sự',
            key: 'HRM.manageHRM.updateStatusStaff'
          },
          { title: 'Xóa mềm nhân sự', key: 'HRM.manageHRM.updateStatus' },
          { title: 'Điều chuyển công tác', key: 'HRM.manageHRM.jobRotation' },

          {
            title: 'Xem hợp đồng lao động',
            key: 'HRM.manageHRM.getLaborContract'
          },
          {
            title: 'Tạo hợp đồng lao động',
            key: 'HRM.manageHRM.createLaborContract'
          },
          {
            title: 'Cập nhập hợp đồng lao động',
            key: 'HRM.manageHRM.updateLaborContract'
          },

          {
            title: 'Xem lịch sử công tác',
            key: 'HRM.manageHRM.getWorkHistory'
          },
          {
            title: 'Tạo lịch sử công tác',
            key: 'HRM.manageHRM.createWorkHistory'
          },
          {
            title: 'Cập nhập lịch sử công tác',
            key: 'HRM.manageHRM.updateWorkHistory'
          },
          {
            title: 'Xóa lịch sử công tác',
            key: 'HRM.manageHRM.deleteWorkHistory'
          },

          { title: 'Xem tài khoản đăng nhập', key: 'HRM.manageHRM.getAccount' },
          {
            title: 'Tạo tài khoản đăng nhập',
            key: 'HRM.manageHRM.createAccountNotUser'
          },
          {
            title: 'Xóa tài khoản đăng nhập',
            key: 'HRM.manageHRM.deleteAccount'
          },
          { title: 'Cập nhập tài khoản', key: 'HRM.manageHRM.updateAccount' },

          {
            title: 'Xem lưu trữ nhân sự',
            key: 'HRM.manageHRM.getAllStoresListHr'
          },
          { title: 'Khôi phục nhân sự', key: 'HRM.manageHRM.restoreStaff' }
        ]
      },
      {
        title: 'Cài đặt',
        key: 'SETTING.setting',
        children: [
          { title: 'Xem chi nhánh', key: 'SETTING.setting.getBranch' },
          { title: 'Tạo mới chi nhánh', key: 'SETTING.setting.createBranch' },
          { title: 'Cập nhập chi nhánh', key: 'SETTING.setting.updateBranch' },
          { title: 'Xóa chi nhánh', key: 'SETTING.setting.deleteBranch' },

          { title: 'Xem phòng ban', key: 'SETTING.setting.getDepartment' },
          {
            title: 'Tạo mới phòng ban',
            key: 'SETTING.setting.createDepartment'
          },
          {
            title: 'Cập nhập phòng ban',
            key: 'SETTING.setting.updateDepartment'
          },
          {
            title: 'Xóa phòng ban',
            key: 'SETTING.setting.deleteDepartment'
          },

          {
            title: 'Xem địa chỉ truy cập',
            key: 'SETTING.setting.getIpAccess'
          },
          {
            title: 'Tạo mới địa chỉ truy cập',
            key: 'SETTING.setting.createIpAccess'
          },
          {
            title: 'Cập nhập địa chỉ truy cập',
            key: 'SETTING.setting.updateIpAccess'
          },
          {
            title: 'Xóa địa chỉ truy cập',
            key: 'SETTING.setting.deleteIpAccess'
          },

          { title: 'Xem vị trí', key: 'SETTING.setting.getPosition' },
          { title: 'Tạo mới vị trí', key: 'SETTING.setting.createPosition' },
          { title: 'Cập nhập vị trí', key: 'SETTING.setting.updatePosition' },
          { title: 'Xóa vị trí', key: 'SETTING.setting.deletePosition' },

          { title: 'Xem ca làm việc', key: 'SETTING.setting.getShift' },
          { title: 'Tạo mới ca làm việc', key: 'SETTING.setting.createShift' },
          {
            title: 'Cập nhập ca làm việc',
            key: 'SETTING.setting.updateShift'
          },
          { title: 'Xóa ca làm việc', key: 'SETTING.setting.deleteShift' }
        ]
      }
    ]
  },
  {
    title: 'CRM',
    key: 'CRM',
    children: [
      {
        title: 'Quản lý data',
        key: 'CRM.dataManagement',
        children: [
          { title: 'Xem data', key: 'CRM.dataManagement.getAllData' },
          { title: 'Xem chi tiết data', key: 'CRM.dataManagement.getDataById' },
          { title: 'Thêm data', key: 'CRM.dataManagement.createData' },
          { title: 'Sửa data', key: 'CRM.dataManagement.updateData' },

          {
            title: 'Xóa data',
            key: 'CRM.manageContract.updateStatusManagement'
          },
          {
            title: 'Chuyển đổi data',
            key: 'CRM.manageContract.changeDataManagement'
          }
        ]
      },
      {
        title: 'Lịch sử chăm sóc',
        key: 'CRM.careHistory',
        children: [
          {
            title: 'Xem lịch sử chăm sóc',
            key: 'CRM.careHistory.getCareHistoryById'
          },
          {
            title: 'Thêm lịch sử chăm sóc',
            key: 'CRM.careHistory.createCareHistory'
          },
          {
            title: 'Sửa lịch sử chăm sóc',
            key: 'CRM.careHistory.updateCareHistory'
          },
          {
            title: 'Xóa lịch sử chăm sóc',
            key: 'CRM.careHistory.deleteCareHistory'
          }
        ]
      },
      {
        title: 'Quản lý khách hàng',
        key: 'CRM.customer',
        children: [
          { title: 'Xem khách hàng', key: 'CRM.customer.getAllCustomer' },
          {
            title: 'Xem chi tiết khách hàng',
            key: 'CRM.customer.getCustomerById'
          },
          { title: 'Thêm khách hàng', key: 'CRM.customer.createCustomer' },
          { title: 'Sửa khách hàng', key: 'CRM.customer.updateCustomer' },
          // { title: 'Xóa cứng khách hàng', key: 'CRM.customer.deleteCustomer' },
          {
            title: 'Xóa khách hàng',
            key: 'CRM.customer.updateStatusCustomer'
          },
          {
            title: 'Xem lịch sử hợp đồng',
            key: 'CRM.customer.getContractHistory'
          }
        ]
      },
      {
        title: 'Quản lý hợp đồng',
        key: 'CRM.contractManagement',
        children: [
          {
            title: 'Hiển thị danh sách hợp đồng',
            key: 'CRM.contractManagement.getAllContract'
          },
          {
            title: 'Xem chi tiết hợp đồng',
            key: 'CRM.contractManagement.getContractById'
          },
          {
            title: 'Thêm mới hợp đồng',
            key: 'CRM.contractManagement.createContract'
          },
          {
            title: 'Sửa hợp đồng',
            key: 'CRM.contractManagement.updateContract'
          },
          // {
          //   title: 'Xóa cứng hợp đồng',
          //   key: 'CRM.contractManagement.deleteContract'
          // },
          {
            title: 'Xóa hợp đồng',
            key: 'CRM.contractManagement.updateStatusContract'
          }
        ]
      },
      {
        title: 'Báo giá',
        key: 'CRM.priceDeclaration',
        children: [
          {
            title: 'Hiển thị danh sách báo giá',
            key: 'CRM.priceDeclaration.getAllPriceDeclaration'
          },
          {
            title: 'Xem chi tiết báo giá',
            key: 'CRM.priceDeclaration.getPriceDeclarationById'
          },
          {
            title: 'Thêm mới báo giá',
            key: 'CRM.priceDeclaration.createPriceDeclaration'
          },
          {
            title: 'Sửa báo giá',
            key: 'CRM.priceDeclaration.updatePriceDeclaration'
          },
          {
            title: 'Xóa báo giá',
            key: 'CRM.priceDeclaration.deletePriceDeclaration'
          },
          {
            title: 'Xóa mềm báo giá',
            key: 'CRM.priceDeclaration.updateStatusPriceDeclaration'
          }
        ]
      },
      {
        title: 'Sản phẩm dịch vụ',
        key: 'CRM.productServices',
        children: [
          {
            title: 'Danh sách sản phẩm',
            key: 'CRM.productServices.getAllProduct'
          },
          {
            title: 'Danh sách dịch vụ',
            key: 'CRM.productServices.getAllService'
          },
          {
            title: 'Thêm mới sản phẩm',
            key: 'CRM.productServices.createProduct'
          },
          {
            title: 'Thêm mới dịch vụ',
            key: 'CRM.productServices.createService'
          },
          {
            title: 'Cập nhập sản phẩm',
            key: 'CRM.productServices.updateProduct'
          },
          {
            title: 'Cập nhập dịch vụ',
            key: 'CRM.productServices.updateService'
          },
          {
            title: 'Xóa sản phẩm',
            key: 'CRM.productServices.deleteProduct'
          },
          {
            title: 'Xóa dịch vụ',
            key: 'CRM.productServices.deleteService'
          }
          // {
          //   title: 'Xóa mềm sản phẩm',
          //   key: 'CRM.productServices.updateStatusProduct'
          // },
          // {
          //   title: 'Xóa mềm dịch vụ',
          //   key: 'CRM.productServices.updateStatusService'
          // }
        ]
      }
    ]
  },
  {
    title: 'ACM',
    key: 'ACM',
    children: [
      {
        title: 'Quản lý tài khoản',
        key: 'ACM.accountManagement',
        children: [
          {
            title: 'Danh sách tài khoản',
            key: 'ACM.accountManagement.accountList',
            children: [
              {
                title: 'Xem',
                key: 'ACM.accountManagement.accountList.seeAccount'
              },
              {
                title: 'Thêm',
                key: 'ACM.accountManagement.accountList.addNewAccount'
              },
              {
                title: 'Sửa',
                key: 'ACM.accountManagement.accountList.updateAccount'
              },
              {
                title: 'Xóa',
                key: 'ACM.accountManagement.accountList.deleteAccount'
              }
            ]
          },
          {
            title: 'Lưu trữ',
            key: 'ACM.accountManagement.archive',
            children: [
              {
                title: 'Xem',
                key: 'ACM.accountManagement.archive.seeArchivedAccount'
              },
              {
                title: 'Xóa',
                key: 'ACM.accountManagement.archive.deleteArchivedAccount'
              },
              {
                title: 'Khôi phục',
                key: 'ACM.accountManagement.archive.restoreArchivedAccount'
              }
            ]
          }
        ]
      },

      {
        title: 'Quản lý thu chi',
        key: 'ACM.revenueExpenditureManage',
        children: [
          {
            title: 'Xem',
            key: 'ACM.revenueExpenditureManage.seeRevenueExpenditure'
          },
          {
            title: 'Thêm',
            key: 'ACM.revenueExpenditureManage.addRevenueExpenditure'
          },
          {
            title: 'Sửa',
            key: 'ACM.revenueExpenditureManage.updateRevenueExpenditure'
          },
          {
            title: 'Xóa',
            key: 'ACM.revenueExpenditureManage.deleteRevenueExpenditure'
          },
          {
            title: 'Xuất excel',
            key: 'ACM.revenueExpenditureManage.exportRevenueExpenditure'
          }
        ]
      }
    ]
  },
  {
    title: 'INSIGHT',
    key: 'INSIGHT',
    children: [
      {
        title: 'Báo cáo',
        key: 'INSIGHT.showInsight',
        children: [
          { title: 'Xem thu', key: 'INSIGHT.showInsight.getLedgerByThu' },
          {
            title: 'Xem biểu đồ loại thu',
            key: 'INSIGHT.showInsight.getLedgerMonthByThu'
          },
          {
            title: 'Xuất excel loại thu',
            key: 'INSIGHT.showInsight.exportLedgerByThu'
          },

          { title: 'Xem chi', key: 'INSIGHT.showInsight.getLedgerByChi' },
          {
            title: 'Xem biểu đồ loại chi',
            key: 'INSIGHT.showInsight.getLedgerMonthByChi'
          },
          {
            title: 'Xuất excel loại chi',
            key: 'INSIGHT.showInsight.exportLedgerByChi'
          }
        ]
      }
    ]
  }
];

const expandKeysDefault = ['HRM', 'CRM', 'ACM', 'INSIGHT'];

const contentList = {
  tab1: (
    <SettingDepartment
      treeData={treeData}
      expandKeysDefault={expandKeysDefault}
    />
  ),
  tab2: (
    <SettingPerson treeData={treeData} expandKeysDefault={expandKeysDefault} />
  )
};

const ManagePerson = () => {
  const [activeTabKey, setActiveTabKey] = useState('tab1');

  return (
    <LayoutMainContent
      tabList={tabList}
      activeTabKey={activeTabKey}
      setActiveTabKey={setActiveTabKey}
    >
      {contentList[activeTabKey]}
    </LayoutMainContent>
  );
};

export default ManagePerson;
