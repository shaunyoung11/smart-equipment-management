// 云函数入口文件
const cloud = require('wx-server-sdk');

cloud.init()

const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();

  const hasRecord = await db.collection('user').where({
    openid: wxContext.OPENID
  }).get();

  if (hasRecord.data.length === 0) {
    await db.collection('user').add({
      data: {
        openid: wxContext.OPENID,
        username: event.username,
        password: event.password
      }
    });
  } else if (event.username !== '' && event.password !== '') {
    await db.collection('user').where({
      openid: wxContext.OPENID
    }).update({
      data: {
        username: event.username,
        password: event.password
      }
    });
  }

  return await db.collection('user').where({
    openid: wxContext.OPENID
  }).get();
}