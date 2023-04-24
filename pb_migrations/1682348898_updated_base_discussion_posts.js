migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("xc2bgljtokcnhok")

  collection.name = "discussion_posts"
  collection.listRule = "@request.auth.id != \"\""
  collection.createRule = "@request.auth.id != \"\""

  // remove
  collection.schema.removeField("63kz9i9i")

  // remove
  collection.schema.removeField("2w8shcow")

  // remove
  collection.schema.removeField("7tc65emj")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "957rvomf",
    "name": "discussion_key",
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
  const collection = dao.findCollectionByNameOrId("xc2bgljtokcnhok")

  collection.name = "base_discussion_posts"
  collection.listRule = null
  collection.createRule = null

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  // update
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
})
