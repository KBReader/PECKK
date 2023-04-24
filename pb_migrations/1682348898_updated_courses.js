migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("obszgdvp778ztya")

  collection.listRule = "@request.auth.id != \"\""
  collection.createRule = "@request.auth.id != \"\""

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "qcakqheb",
    "name": "name",
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
  const collection = dao.findCollectionByNameOrId("obszgdvp778ztya")

  collection.listRule = null
  collection.createRule = null

  // remove
  collection.schema.removeField("qcakqheb")

  return dao.saveCollection(collection)
})
