def handler(event, context):
  print('createUserResolver')
  print('received event: ')
  print(event)
  return {
    'message': 'createUserResolver - Hello from your new Amplify Python lambda!'
  }
