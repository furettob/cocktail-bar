const functions = require('firebase-functions').region('europe-west1')
const checker =  require('./checker')
const cors = require('cors')({origin: true})
const {admin} = require('./app')
const crud = require("./crud")
const {addCreatedByMeDrink} = require("./users")

const db = admin.database()

const entity = "drink"
const entities = "drinks"
const basePath = "drinks/"

// addDrink
const addDrinkDataChecker = (request, response) => {
  if (!checker.checkDataPostReq(
    request,
    response,
    [
      "uid",
      "username",
      "drink",
      "drink.name"
    ])) {
    return false
  }
  return true
}
exports.addDrink = functions.https.onRequest(async (request, response) => {
  cors(request, response, async () => {
    try {
      if (checker.checkAuthorizedPostReq(request, response) && addDrinkDataChecker(request, response)) {
        await checker.checkAuthorizedUser(request, response);
        const { drink, uid, username} = request.body
        const drinkRef = db.ref(`${basePath}`).push()

        const c  = drink.thumbByteArray.split(",")[1]
        const imageBuffer = new Uint8Array(Buffer.from(c, 'base64'))
        const fn = `thumbs/${drink.name}.png`

        const fileSaveRes = await admin.storage().bucket().file(fn).save(
          imageBuffer,
          { resumable: false, metadata: { contentType: "image/png" } }
        )

        console.log("fileSaveRes: ", fileSaveRes)

        const tu = "https://firebasestorage.googleapis.com/v0/b/fb-cocktailbar-v2.appspot.com/o/" + encodeURIComponent(fn) + "?alt=media"
        const {name, strInstructions} = drink
        console.log("N: ", name, strInstructions)
        const drinkObj = Object.assign({},
          {name:name},
          {strInstructions:strInstructions},
          { createdAt: Date.now(), thumbUrl: tu, author:{uid, username}, id:drinkRef.key}
        )
        await drinkRef.set(drinkObj)
        response.status(200).send({
          msg: `Successfully created ${entity} in ${basePath} with id ${drinkRef.key}`,
          data: drinkObj
        });
        await addCreatedByMeDrink(uid, drink.name, drinkRef.key)

        return true
      }
    } catch (e) {
      console.log("ERROR::: ", JSON.stringify(e))
      response.status(500).send({ error: e });
    }
  })
});

// getUser
const getDrinksByIdDataChecker = (request, response) => {
  if (!checker.checkDataPostReq(
    request,
    response,
    [
      "drinkIdList"
    ])) {
    return false
  }
  return true
}
exports.getDrinksById =  functions.https.onRequest(async (request, response) => {
  cors(request, response, async () => {
    try {
      if (checker.checkAuthorizedPostReq(request, response) && getDrinksByIdDataChecker(request, response)) {
        // NO need to check user
        const { drinkIdList } = request.body
        const drinks = []
        const splittedList = drinkIdList.split(",")
        for (let i in splittedList) {
          const res = await this.getDrinkCRUD(splittedList[i])
          drinks.push(res)
        }
        response.status(200).send({ data: drinks });
      }
    } catch (e) {
      response.status(500).send({ error: e });
    }
  })
})
exports.getDrinkCRUD = async (id) => {
    return await crud.getDoc(`${basePath}${id}`)
}
