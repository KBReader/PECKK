migrate((db) => {
  const collection = new Collection({
    "id": "bk6vc0eswy31d90",
    "created": "2023-04-12 17:46:57.775Z",
    "updated": "2023-04-12 17:46:57.775Z",
    "name": "user_profile",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "cxxnsibn",
        "name": "join_date",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "edsvkwyl",
        "name": "major",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "7vnvznj9",
        "name": "description",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "ninrcv2r",
        "name": "profile_pic",
        "type": "file",
        "required": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "maxSize": 5242880,
          "mimeTypes": [
            "image/png",
            "image/jpeg"
          ],
          "thumbs": []
        }
      },
      {
        "system": false,
        "id": "gyqmcyh2",
        "name": "username",
        "type": "text",
        "required": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("bk6vc0eswy31d90");

  return dao.deleteCollection(collection);
})
