migrate((db) => {
  const collection = new Collection({
    "id": "xc2bgljtokcnhok",
    "created": "2023-04-12 17:46:57.775Z",
    "updated": "2023-04-12 17:46:57.775Z",
    "name": "base_discussion_posts",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "957rvomf",
        "name": "post_id",
        "type": "text",
        "required": false,
        "unique": true,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "tzjzrxig",
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
        "id": "63kz9i9i",
        "name": "attachments",
        "type": "file",
        "required": false,
        "unique": false,
        "options": {
          "maxSelect": 5,
          "maxSize": 5242880,
          "mimeTypes": [],
          "thumbs": []
        }
      },
      {
        "system": false,
        "id": "2w8shcow",
        "name": "likes",
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
        "id": "7tc65emj",
        "name": "dislikes",
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
        "id": "dkkzpknb",
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
  const collection = dao.findCollectionByNameOrId("xc2bgljtokcnhok");

  return dao.deleteCollection(collection);
})
