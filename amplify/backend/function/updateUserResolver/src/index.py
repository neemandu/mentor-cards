def handler(event, context):
  print('updateUserResolver')
  print('received event:')
  print(event)
  return {
    'message': 'updateUserResolver -  Hello from your new Amplify Python lambda!'
  }
