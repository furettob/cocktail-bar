const functions = require('firebase-functions').region('europe-west1')
const checker =  require('./checker')
const cors = require('cors')({origin: true})
const {admin} = require('./app')
const crud = require("./crud")
const {addCreatedByMeDrink} = require("./users")
const { getStorage, ref, uploadBytes } = require("firebase/storage")

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
        /*await checker.checkAuthorizedUser(request, response);
        const { drink, uid, username} = request.body
        const drinkRef = db.ref(`${basePath}`).push()
        const drinkObj = Object.assign(drink, { createdAt: Date.now(), author:{uid, username}, id:drinkRef.key})
        await addCreatedByMeDrink(uid, drink.name, drink.id)
        await drinkRef.set(drinkObj)
        response.status(200).send({
          msg: `Successfully created ${entity} in ${basePath} with id ${drinkRef.key}`,
          data: drinkObj
        });*/

        const { drink, uid, username} = request.body

        const bucket = admin.storage().bucket()
        const c  = drink.thumbByteArray.split(",")[1]

        const imageBuffer = new Uint8Array(Buffer.from(c, 'base64'))
        const file = bucket.file(`thumbs/${drink.name}.png`);

        file.save(
          imageBuffer,
          { resumable: false, metadata: { contentType: "image/png" } },
          err => {
            if (err) {
              console.log("Error in upload file::: ", err)
              throw new Error(err);
            }
            response.send({
              success: true,
              message: "File Successfully Uploaded..."
            });
          }
        )

        return true
      }
    } catch (e) {
      console.log("ERROR::: ", JSON.stringify(e))
      response.status(500).send({ error: e });
    }
  })
});

// toggleFavouriteDrink
const toggleFavouriteDrinkDataChecker = (request, response) => {
  if (!checker.checkDataPostReq(
    request,
    response,
    [
      "uid",
      "drinkId",
      "drinkName"
    ])) {
    return false
  }
  return true
}
exports.toggleFavouriteDrink =  functions.https.onRequest(async (request, response) => {
  cors(request, response, async () => {
    try {
      if (checker.checkAuthorizedPostReq(request, response) && toggleFavouriteDrinkDataChecker(request, response)) {
        const decToken = await checker.checkAuthorizedUser(request, response)
        const { drinkId, drinkName, uid } = request.body
        const fl = await crud.getDoc(`${basePath}${decToken.user_id}/favouriteList`) || {}
        if (Object.keys(fl).indexOf(drinkId) > -1) {
          delete fl[drinkId]
        } else {
          fl[drinkId] = {name: drinkName}
        }
        await crud.setDoc(`${basePath}${uid}/favouriteList`, fl)
        console.log("NEW FL:: ", fl)
        response.status(200).send({ data: fl });
      }
    } catch (e) {
      response.status(500).send({ error: e });
    }
  })
})

// getUser
const getUserCustomDataDataChecker = (request, response) => {
  if (!checker.checkDataPostReq(
    request,
    response,
    [
      "uid"
    ])) {
    return false
  }
  return true
}
exports.getUserCustomData =  functions.https.onRequest(async (request, response) => {
  cors(request, response, async () => {
    try {
      if (checker.checkAuthorizedPostReq(request, response) && getUserCustomDataDataChecker(request, response)) {
        const { uid } = request.body
        const res = await this.getUserCRUD(uid)
        response.status(200).send({ data: res });
      }
    } catch (e) {
      response.status(500).send({ error: e });
    }
  })
})
exports.getUserCRUD = async (uid) => {
    return await crud.getDoc(`${basePath}${uid}`)
}

// getUserList
const getUserListChecker = async (request, response) => {
    if (!checker.checkAuthorizedPostReq(request, response)) {
        return false
    }
    if (!checker.checkDataPostReq(
        request,
        response,
        [])) {
        return false
    }
    const isUserAuthorized = await checker.checkAuthorizedUser(request, response)

    return isUserAuthorized
}
exports.getUserList =  functions.https.onRequest(async (request, response) => {
    cors(request, response, async () => {
        try {
            const proceed = await getUserListChecker(request, response)
            if (proceed) {
                const res = await db.ref(`${basePath}`).once('value');
                response.status(200).send({data: res});
            }
        } catch (e) {
            response.status(500).send({error: e});
        }
    })
})

// updateUser
const updateUserDataChecker = (request, response) => {
    if (!request || !request.body) {
        response.status(400).end(); // 400 Bad Request
        return false;
    }
    if (
        !!request.body.uid &&
        !!request.body.updatedData
    ) {
        return true;
    } else {
        response.status(400).send({"error":"missing uid or updatedData param in request"}); // 400 Bad Request
        return false;
    }
}
exports.updateUser = functions.https.onRequest(async (request, response) => {
    try {
        if(checker.checkAuthorizedPostReq(request, response) && updateUserDataChecker(request, response)) {
            const {uid} = request.body
            const updatedData = request.body.updatedData
            const userUpdated = await crud.updateDoc(`${basePath}${uid}`, uid, updatedData)
            if (!userUpdated) {
                response.status(404).send({
                    data: `There is no ${entity} with id ${uid} in the ${basePath} path`
                });
            } else {
                response.status(200).send({
                    data: `Successfully updated ${entity} with id ${uid}`
                });
            }
            return updatedData
        }
    } catch (e) {
        response.status(500).send({error: e});
    }
});

// deleteUser
const deleteUserDataChecker = (request, response) => {
    if (!request || !request.body) {
        response.status(400).end(); // 400 Bad Request
        return false
    }
    if (
        !!request.body.uid
    ) {
        return true
    } else {
        response.status(400).send({"error":"missing uid param in request"}); // 400 Bad Request
        return false
    }
}
exports.deleteUser = functions.https.onRequest(async (request, response) => {
    try {
        if(checker.checkAuthorizedPostReq(request, response) && deleteUserDataChecker(request, response)) {
            const {uid} = request.body
            await db.ref(`users/www`).set(null) // delete() does not work
            response.status(200).send({
                data: `Successfully deleted ${entity} with id ${uid}`
            });
            return uid
        }
    } catch (e) {
        response.status(500).send({error: e});
    }
});
