import Cookies from "js-cookie";

const checkedTab = 'checkedTab'
const username = 'username'
const role = 'role'
const menu = 'menu'
const history = 'history'
const tabItem = 'tabItem'


export  function setTab(value){
   return Cookies.set(checkedTab,value)
};


export  function getTab(){
    return Cookies.get(checkedTab)
}

export  function removeTab(){
    return Cookies.remove(checkedTab)
}

export  function setMeunTab(value){
    return Cookies.set(menu,value)
 };
 
 
 export  function getMeunTab(){
     return Cookies.get(menu)
 }

 //存储搜索历史
 export  function setSearchHistory(value){
    return Cookies.set(history,value)
 };
 
 
 export  function getSearchHistory(){
     return Cookies.get(history)
 }

 //二级菜单存储
 export  function setTabItem(value){
    return Cookies.set(tabItem,value)
 };
 
 
 export  function getTabItem(){
     return Cookies.get(tabItem)
 }