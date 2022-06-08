function time (){
    let dt = new Date()
    let y = dt.getFullYear();
    let mt = (dt.getMonth()+ 1) < 10? '0'+ (dt.getMonth()+ 1) : dt.getMonth()+ 1;
    let day = new Date().getDate()< 10 ? '0'+ new Date().getDate():new Date().getDate();
    
    let nowTime = `${ y + '/' + mt+ '/' + day }`
    return nowTime
}

export default time