import Mock from 'mockjs'
import homeApi from './mockServeData/home'
import userApi from './mockServeData/user'
import perissionApi from './mockServeData/permission'

Mock.mock('/home/getData',homeApi.getStatisticalData())

// 用户的新增 和编辑
Mock.mock(/user\/add/,'post',userApi.createUser)
Mock.mock(/user\/edit/,'post',userApi.updateUser)

// 获取表格列表数据
Mock.mock(/user\/getUser/,'get',userApi.getUserList)

Mock.mock(/user\/del/,'get',userApi.deleteUser)

Mock.mock(/permission\/getMenu/,'get',perissionApi.getMenu)

