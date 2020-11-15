import { v4 as uuidv4 } from 'uuid';

export function getUserTempId() {
    // 第一步:从localStorage当中获取临时用户标识userTempId   如果有就直接使用,没有再创建新的(这个标识一般不变)
    let userTempId = localStorage.getItem('USERTEMPID_KEY')//当localstorage中没有   获取到的是null
    if (!userTempId) {
        userTempId = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
        localStorage.setItem('USERTEMPID_KEY', userTempId)  //通过key获取
    }
    return userTempId
    // 获取的是字符串不用转换     如果是对象/数组  需要JSON.stringify/JSON.parse
}