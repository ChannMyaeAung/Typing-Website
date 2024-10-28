export default {
  name: 'word',
  title: 'Word',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'title',
      type: 'string',
    },
    {
      name: 'text_short',
      title: 'Text_short',
      type: 'string',
    },
    {
      name: 'text_medium',
      title: 'Text_medium',
      type: 'string',
    },
    {
      name: 'text_long',
      title: 'Text_long',
      type: 'string',
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{type: 'block'}],
    },
  ],
}
