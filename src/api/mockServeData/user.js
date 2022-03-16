import Mock from 'mockjs'

function param2Obj(url){
  const search = url.split('?')[1]
  if(!search){
    return {}
  }
  return JSON.parse(
    '{"' + 
     decodeURIComponent(search)
     .replace(/"/g,'\\"')
     .replace(/&/g,'","')
     .replace(/=/g,'":"') +
    '"}'
  )
}

let List = []
const count = 200
for(let i =0;i<count;i++){
    const data = Mock.mock({
        id:Mock.Random.guid(),
        name:Mock.Random.cname(),
        addr:Mock.mock('@country(true)'),
        'age|18-60':1,
        birth:Mock.Random.date(),
        sex:Mock.Random.integer(0,1),
   })
   List.push(data)
}
export default {
    // 需要带的参数 name page limit name 可以不填  page  limit 有默认值  获取用户列表
    getUserList:config=>{
      const {name,page =1,limit=20} = param2Obj(config.url)
      const mockList = List.filter(user=>{
          if(name && user.name.indexOf(name) === -1 && user.addr.indexOf(name) === -1) return false;
          return true;
      })
      const pageList = mockList.filter((item,index)=>index < limit* page && index >= limit * (page-1))
      return {
        code:20000,
        count:mockList.length,
         list:pageList,
       }
    },
    // 新增用户
    createUser:config=>{
        const {name,age,birth,sex,addr} = JSON.parse(config.body)
        List.unshift({
            id:Mock.Random.guid(),
            name:name,
            addr:addr,
            age:age,
            birth:birth,
            sex:sex,
        })
        return{
            code:20000,
            data:{
                message:'添加成功'
            }
        }
    },
    // 删除用户、
    deleteUser:config=>{
        const { id } =  param2Obj(config.url)
        if(!id){
            return{
                code:999,
                message:'参数不正确',
            }
        }else{
            List = List.filter(u =>u.id !== id)
            return{
                code:999,
                message:'删除成功',
            }
        }
    },
    //批量删除
    batchremove:config=>{
        const { ids } =  param2Obj(config.url)
        ids = ids.split(',')
        List = List.filter(u =>!ids.include(u.id))
        return{
            code:20000,
            data:{
                message:'批量删除成功',
            }
        }
    },
    // 修改用户
    updateUser:config=>{
        const {id,name,age,addr,birth,sex} = JSON.parse(config.body)
        const sex_num = parseInt(sex)
        List.some(u=>{
            if(u.id===id){
                u.name=name
                u.age=age
                u.addr=addr
                u.birth=birth
                u.sex=sex
                return true
            }
        })
        return{
            code:20000,
            data:{
                message:'编辑成功'
            }
        }
    },
}