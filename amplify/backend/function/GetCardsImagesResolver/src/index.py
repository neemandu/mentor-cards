def handler(event, context):
  print('event')
  print(event)
  ## [Start] Dynamic Group Authorization Checks **
  isDynamicGroupAuthorized = False
  allowedGroups = None
  userGroups = None
  if "groupsIds" in event["source"]:
    allowedGroups = event["source"]["groupsIds"]
    if allowedGroups is None:
      allowedGroups = []
    if "cognito:groups" in event["identity"]["claims"]:
      userGroups = event["identity"]["claims"]["cognito:groups"]
    if userGroups is None:
      userGroups = []
    for userGroup in userGroups:
      if isinstance(allowedGroups, list) :
        if any(userGroup in s for s in allowedGroups):
          isDynamicGroupAuthorized = True
      if isinstance(allowedGroups, str) :
        if allowedGroups == userGroup:
          isDynamicGroupAuthorized = True
  ## [End] Dynamic Group Authorization Checks **
  ## [Start] Owner Authorization Checks **
  isOwnerAuthorized = False
  identityValue = None
  allowedOwners = None
  if "usersIds" in event["source"]:
    allowedOwners = event["source"]["usersIds"]
  if allowedOwners is None:
    allowedOwners = []
  if "username" in event["identity"]["claims"]:
    identityValue = event["identity"]["claims"]["username"]
  if identityValue is None:
    if "cognito:username" in event["identity"]["claims"]:
      identityValue = event["identity"]["claims"]["cognito:username"]
  if identityValue is None:
    identityValue = "___xamznone____"
  if isinstance(allowedOwners, list) :
    if any(identityValue in s for s in allowedOwners):
      isOwnerAuthorized = True
  if isinstance(allowedOwners, str) :
    if identityValue == allowedOwners:
      isOwnerAuthorized = True
  ## [End] Owner Authorization Checks **
  if isOwnerAuthorized or isDynamicGroupAuthorized:
    if "cards" in event["source"]:
      return event["source"]["cards"]
  return []
