migrate((db) => {
  const collection = new Collection({
    "id": "uwh8z74c58itogs",
    "created": "2023-04-12 17:46:57.775Z",
    "updated": "2023-04-12 17:46:57.775Z",
    "name": "base_course_discussions",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "pi8azzt0",
        "name": "db_id",
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
        "id": "tli5g9bz",
        "name": "title",
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
        "id": "7ofuw6oz",
        "name": "time",
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
  const collection = dao.findCollectionByNameOrId("uwh8z74c58itogs");

  return dao.deleteCollection(collection);
})
