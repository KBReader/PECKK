migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uwh8z74c58itogs")

  collection.name = "course_discussions"
  collection.listRule = "@request.auth.id != \"\""
  collection.createRule = "@request.auth.id != \"\""

  // remove
  collection.schema.removeField("pi8azzt0")

  // remove
  collection.schema.removeField("7ofuw6oz")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fwniagvu",
    "name": "course_key",
    "type": "text",
    "required": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("uwh8z74c58itogs")

  collection.name = "base_course_discussions"
  collection.listRule = null
  collection.createRule = null

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  // remove
  collection.schema.removeField("fwniagvu")

  return dao.saveCollection(collection)
})
