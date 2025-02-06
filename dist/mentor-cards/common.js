"use strict";
(self["webpackChunkmentor_cards"] = self["webpackChunkmentor_cards"] || []).push([["common"],{

/***/ 53931:
/*!***********************************************************************************!*\
  !*** ./node_modules/@aws-amplify/ui-components/dist/esm/auth-helpers-d97ec2fb.js ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "c": () => (/* binding */ checkContact),
/* harmony export */   "h": () => (/* binding */ handleSignIn)
/* harmony export */ });
/* harmony import */ var C_Users_Sampath_Music_mentor_cards_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./node_modules/@babel/runtime/helpers/esm/asyncToGenerator */ 19369);
/* harmony import */ var _aws_amplify_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @aws-amplify/core */ 75582);
/* harmony import */ var _aws_amplify_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @aws-amplify/core */ 56722);
/* harmony import */ var _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./auth-types-78df304e.js */ 94247);
/* harmony import */ var _aws_amplify_auth__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @aws-amplify/auth */ 22108);
/* harmony import */ var _Translations_3f32c42a_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Translations-3f32c42a.js */ 58477);
/* harmony import */ var _constants_d1abe7de_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./constants-d1abe7de.js */ 14481);
/* harmony import */ var _helpers_9a4b32d1_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./helpers-9a4b32d1.js */ 1579);







const logger = new _aws_amplify_core__WEBPACK_IMPORTED_MODULE_5__.ConsoleLogger('auth-helpers');

function checkContact(_x, _x2) {
  return _checkContact.apply(this, arguments);
}

function _checkContact() {
  _checkContact = (0,C_Users_Sampath_Music_mentor_cards_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__.default)(function* (user, handleAuthStateChange) {
    if (!_aws_amplify_auth__WEBPACK_IMPORTED_MODULE_6__.Auth || typeof _aws_amplify_auth__WEBPACK_IMPORTED_MODULE_6__.Auth.verifiedContact !== 'function') {
      throw new Error(_constants_d1abe7de_js__WEBPACK_IMPORTED_MODULE_3__.N);
    }

    try {
      const data = yield _aws_amplify_auth__WEBPACK_IMPORTED_MODULE_6__.Auth.verifiedContact(user);

      if (!(0,_aws_amplify_core__WEBPACK_IMPORTED_MODULE_7__.isEmpty)(data.verified) || (0,_aws_amplify_core__WEBPACK_IMPORTED_MODULE_7__.isEmpty)(data.unverified)) {
        handleAuthStateChange(_auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_1__.A.SignedIn, user);
      } else {
        const newUser = Object.assign(user, data);
        handleAuthStateChange(_auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_1__.A.VerifyContact, newUser);
      }
    } catch (error) {
      (0,_helpers_9a4b32d1_js__WEBPACK_IMPORTED_MODULE_4__.a)(error);
    }
  });
  return _checkContact.apply(this, arguments);
}

const handleSignIn = /*#__PURE__*/function () {
  var _ref = (0,C_Users_Sampath_Music_mentor_cards_node_modules_babel_runtime_helpers_esm_asyncToGenerator__WEBPACK_IMPORTED_MODULE_0__.default)(function* (username, password, handleAuthStateChange) {
    if (!_aws_amplify_auth__WEBPACK_IMPORTED_MODULE_6__.Auth || typeof _aws_amplify_auth__WEBPACK_IMPORTED_MODULE_6__.Auth.signIn !== 'function') {
      throw new Error(_constants_d1abe7de_js__WEBPACK_IMPORTED_MODULE_3__.N);
    }

    try {
      const user = yield _aws_amplify_auth__WEBPACK_IMPORTED_MODULE_6__.Auth.signIn(username, password);
      logger.debug(user);

      if (user.challengeName === _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_1__.C.SMSMFA || user.challengeName === _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_1__.C.SoftwareTokenMFA) {
        logger.debug('confirm user with ' + user.challengeName);
        handleAuthStateChange(_auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_1__.A.ConfirmSignIn, user);
      } else if (user.challengeName === _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_1__.C.NewPasswordRequired) {
        logger.debug('require new password', user.challengeParam);
        handleAuthStateChange(_auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_1__.A.ResetPassword, user);
      } else if (user.challengeName === _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_1__.C.MFASetup) {
        logger.debug('TOTP setup', user.challengeParam);
        handleAuthStateChange(_auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_1__.A.TOTPSetup, user);
      } else if (user.challengeName === _auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_1__.C.CustomChallenge && user.challengeParam && user.challengeParam.trigger === 'true') {
        logger.debug('custom challenge', user.challengeParam);
        handleAuthStateChange(_auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_1__.A.CustomConfirmSignIn, user);
      } else {
        yield checkContact(user, handleAuthStateChange);
      }
    } catch (error) {
      if (error.code === 'UserNotConfirmedException') {
        logger.debug('the user is not confirmed');
        handleAuthStateChange(_auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_1__.A.ConfirmSignUp, {
          username
        });
      } else if (error.code === 'PasswordResetRequiredException') {
        logger.debug('the user requires a new password');
        handleAuthStateChange(_auth_types_78df304e_js__WEBPACK_IMPORTED_MODULE_1__.A.ForgotPassword, {
          username
        });
      } else if (error.code === 'InvalidParameterException' && password === '') {
        logger.debug('Password cannot be empty');
        error.message = _Translations_3f32c42a_js__WEBPACK_IMPORTED_MODULE_2__.T.EMPTY_PASSWORD;
      }

      (0,_helpers_9a4b32d1_js__WEBPACK_IMPORTED_MODULE_4__.a)(error);
    }
  });

  return function handleSignIn(_x3, _x4, _x5) {
    return _ref.apply(this, arguments);
  };
}();



/***/ })

}]);
//# sourceMappingURL=common.js.map