function getContrastingTextColor(e) {
    e || (e = "#fff"),
    "#" === e.charAt(0) && (e = e.substring(1));
    return (.299 * parseInt(e.substring(0, 2), 16) + .587 * parseInt(e.substring(2, 4), 16) + .114 * parseInt(e.substring(4, 6), 16)) / 255 > .6 ? "black" : "white"
}
const lightChatBubble = '<svg width="36" height="36" viewBox="0 0 36 36" fill="white" xmlns="http://www.w3.org/2000/svg">\n<mask id="mask0_17_125" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="17" y="3" width="2" height="13">\n<path d="M17.4481 3.05676H18.5585V15.8317H17.4481V3.05676Z" fill="white"/>\n</mask>\n<g mask="url(#mask0_17_125)">\n<path d="M18.5585 3.05676V15.8317H17.4481V3.05676H18.5585Z" fill="white"/>\n</g>\n<mask id="mask1_17_125" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="16" y="0" width="4" height="4">\n<path d="M16.4062 0.703857H19.5938V3.9375H16.4062V0.703857Z" fill="white"/>\n</mask>\n<g mask="url(#mask1_17_125)">\n<mask id="mask2_17_125" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="16" y="0" width="4" height="4">\n<path d="M18.0033 3.86426C18.4244 3.86426 18.82 3.70056 19.1181 3.40247C19.4132 3.1073 19.5813 2.69934 19.5802 2.28149C19.5787 1.86328 19.414 1.46887 19.1181 1.17297C18.82 0.87561 18.4244 0.711914 18.0033 0.711914C17.5822 0.711914 17.1867 0.87561 16.8886 1.17371C16.5927 1.4696 16.429 1.86328 16.4268 2.28223C16.4253 2.69934 16.5934 3.10803 16.8886 3.4032C17.1867 3.70056 17.5822 3.86426 18.0033 3.86426Z" fill="white"/>\n</mask>\n<g mask="url(#mask2_17_125)">\n<path d="M19.5813 0.711914V3.86426H16.4253V0.711914H19.5813Z" fill="white"/>\n</g>\n</g>\n<mask id="mask3_17_125" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="14" y="10" width="8" height="8">\n<path d="M14.625 10.5H21.375V17.25H14.625V10.5Z" fill="white"/>\n</mask>\n<g mask="url(#mask3_17_125)">\n<mask id="mask4_17_125" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="14" y="10" width="8" height="8">\n<path d="M18.0033 17.2119C18.8994 17.2119 19.7424 16.8629 20.376 16.2294C21.0018 15.6035 21.36 14.7371 21.3585 13.8512C21.3571 12.9573 21.0081 12.1161 20.376 11.4844C19.7424 10.8508 18.8994 10.5015 18.0033 10.5015C17.1072 10.5015 16.2649 10.8508 15.6306 11.4844C14.9989 12.1161 14.6495 12.9573 14.6481 13.8512C14.6466 14.7363 15.0051 15.6028 15.6306 16.2294C16.2642 16.8629 17.1072 17.2119 18.0033 17.2119Z" fill="white"/>\n</mask>\n<g mask="url(#mask4_17_125)">\n<path d="M21.36 10.5015V17.2119H14.6466V10.5015H21.36Z" fill="white"/>\n</g>\n</g>\n<mask id="mask5_17_125" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="1" y="13" width="34" height="23">\n<path d="M1.3407 13.5H34.6589V35.2976H1.3407V13.5Z" fill="white"/>\n</mask>\n<g mask="url(#mask5_17_125)">\n<mask id="mask6_17_125" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="1" y="13" width="34" height="23">\n<path fill-rule="evenodd" clip-rule="evenodd" d="M25.0942 13.511H10.912C5.62317 13.511 1.33557 17.7986 1.33557 23.087C1.33557 26.9736 3.65149 30.3164 6.97778 31.8175L6.68738 32.3632L5.13135 35.287L8.05518 33.731L10.1268 32.6287C10.3865 32.6495 10.6469 32.6635 10.912 32.6635H25.0942C30.3831 32.6635 34.6703 28.3759 34.6703 23.087C34.671 17.7986 30.3831 13.511 25.0942 13.511Z" fill="white"/>\n</mask>\n<g mask="url(#mask6_17_125)">\n<path fill-rule="evenodd" clip-rule="evenodd" d="M34.6589 35.287V13.511H1.3407V35.287H34.6589ZM24.5914 21.6562C24.312 21.9357 23.9249 22.0961 23.5294 22.0961H23.5265C23.1262 22.0957 22.7498 21.9393 22.467 21.6562C22.1843 21.3735 22.028 20.9974 22.0272 20.5972C22.0265 20.2002 22.1869 19.812 22.467 19.5322C22.7505 19.2491 23.1269 19.0931 23.5294 19.0924C23.9249 19.0924 24.312 19.2528 24.5914 19.5322C24.8716 19.8127 25.032 20.2009 25.0312 20.5972C25.0305 20.9974 24.8741 21.3735 24.5914 21.6562ZM12.4775 22.0961C12.873 22.0961 13.2601 21.9357 13.5395 21.6562C13.8204 21.3757 13.9808 20.9872 13.9794 20.5902C13.9779 20.1903 13.8226 19.8149 13.5395 19.5322C13.2601 19.2528 12.873 19.0924 12.4775 19.0924C12.0751 19.0931 11.699 19.2491 11.4159 19.5322C11.1332 19.8149 10.9768 20.1903 10.9761 20.5902C10.9746 20.9872 11.1354 21.3757 11.4159 21.6562C11.699 21.9393 12.0758 22.0957 12.4761 22.0961H12.4775ZM20.2804 27.7632C19.6161 28.2085 18.8068 28.4539 18.0018 28.4539H17.948C17.0947 28.4429 16.2806 28.1719 15.5929 27.6698C15.4241 27.5468 15.2637 27.4098 15.1157 27.2626C14.9275 27.0751 14.7568 26.8685 14.6081 26.6484C14.4587 26.4272 14.3302 26.1907 14.2269 25.9453C14.0742 25.5828 13.9753 25.2004 13.9325 24.8082C13.9186 24.6852 13.9614 24.5643 14.0486 24.4764C14.1639 24.3604 14.3368 24.3457 14.4745 24.3457C14.5217 24.3457 14.5697 24.348 14.6165 24.3502C14.6292 24.3508 14.6418 24.3514 14.6543 24.3519C14.7089 24.3549 14.7609 24.3574 14.8092 24.3574H21.6746C21.7819 24.3574 21.8829 24.3995 21.9587 24.4757C22.0459 24.5636 22.088 24.6844 22.0748 24.8075C22.032 25.1997 21.9327 25.582 21.7804 25.9446C21.6768 26.1899 21.5486 26.4265 21.3995 26.6477C21.2516 26.8678 21.0798 27.0743 20.892 27.2618C20.7052 27.4479 20.499 27.6167 20.2804 27.7632Z" fill="white"/>\n</g>\n</g>\n</svg>\n'
  , darkChatBubble = '<svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">\n<mask id="mask0_17_125" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="17" y="3" width="2" height="13">\n<path d="M17.4481 3.05676H18.5585V15.8317H17.4481V3.05676Z" fill="white"/>\n</mask>\n<g mask="url(#mask0_17_125)">\n<path d="M18.5585 3.05676V15.8317H17.4481V3.05676H18.5585Z" fill="#2C2C2C"/>\n</g>\n<mask id="mask1_17_125" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="16" y="0" width="4" height="4">\n<path d="M16.4062 0.703857H19.5938V3.9375H16.4062V0.703857Z" fill="white"/>\n</mask>\n<g mask="url(#mask1_17_125)">\n<mask id="mask2_17_125" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="16" y="0" width="4" height="4">\n<path d="M18.0033 3.86426C18.4244 3.86426 18.82 3.70056 19.1181 3.40247C19.4132 3.1073 19.5813 2.69934 19.5802 2.28149C19.5787 1.86328 19.414 1.46887 19.1181 1.17297C18.82 0.87561 18.4244 0.711914 18.0033 0.711914C17.5822 0.711914 17.1867 0.87561 16.8886 1.17371C16.5927 1.4696 16.429 1.86328 16.4268 2.28223C16.4253 2.69934 16.5934 3.10803 16.8886 3.4032C17.1867 3.70056 17.5822 3.86426 18.0033 3.86426Z" fill="white"/>\n</mask>\n<g mask="url(#mask2_17_125)">\n<path d="M19.5813 0.711914V3.86426H16.4253V0.711914H19.5813Z" fill="#2C2C2C"/>\n</g>\n</g>\n<mask id="mask3_17_125" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="14" y="10" width="8" height="8">\n<path d="M14.625 10.5H21.375V17.25H14.625V10.5Z" fill="white"/>\n</mask>\n<g mask="url(#mask3_17_125)">\n<mask id="mask4_17_125" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="14" y="10" width="8" height="8">\n<path d="M18.0033 17.2119C18.8994 17.2119 19.7424 16.8629 20.376 16.2294C21.0018 15.6035 21.36 14.7371 21.3585 13.8512C21.3571 12.9573 21.0081 12.1161 20.376 11.4844C19.7424 10.8508 18.8994 10.5015 18.0033 10.5015C17.1072 10.5015 16.2649 10.8508 15.6306 11.4844C14.9989 12.1161 14.6495 12.9573 14.6481 13.8512C14.6466 14.7363 15.0051 15.6028 15.6306 16.2294C16.2642 16.8629 17.1072 17.2119 18.0033 17.2119Z" fill="white"/>\n</mask>\n<g mask="url(#mask4_17_125)">\n<path d="M21.36 10.5015V17.2119H14.6466V10.5015H21.36Z" fill="#2C2C2C"/>\n</g>\n</g>\n<mask id="mask5_17_125" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="1" y="13" width="34" height="23">\n<path d="M1.3407 13.5H34.6589V35.2976H1.3407V13.5Z" fill="white"/>\n</mask>\n<g mask="url(#mask5_17_125)">\n<mask id="mask6_17_125" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="1" y="13" width="34" height="23">\n<path fill-rule="evenodd" clip-rule="evenodd" d="M25.0942 13.511H10.912C5.62317 13.511 1.33557 17.7986 1.33557 23.087C1.33557 26.9736 3.65149 30.3164 6.97778 31.8175L6.68738 32.3632L5.13135 35.287L8.05518 33.731L10.1268 32.6287C10.3865 32.6495 10.6469 32.6635 10.912 32.6635H25.0942C30.3831 32.6635 34.6703 28.3759 34.6703 23.087C34.671 17.7986 30.3831 13.511 25.0942 13.511Z" fill="white"/>\n</mask>\n<g mask="url(#mask6_17_125)">\n<path fill-rule="evenodd" clip-rule="evenodd" d="M34.6589 35.287V13.511H1.3407V35.287H34.6589ZM24.5914 21.6562C24.312 21.9357 23.9249 22.0961 23.5294 22.0961H23.5265C23.1262 22.0957 22.7498 21.9393 22.467 21.6562C22.1843 21.3735 22.028 20.9974 22.0272 20.5972C22.0265 20.2002 22.1869 19.812 22.467 19.5322C22.7505 19.2491 23.1269 19.0931 23.5294 19.0924C23.9249 19.0924 24.312 19.2528 24.5914 19.5322C24.8716 19.8127 25.032 20.2009 25.0312 20.5972C25.0305 20.9974 24.8741 21.3735 24.5914 21.6562ZM12.4775 22.0961C12.873 22.0961 13.2601 21.9357 13.5395 21.6562C13.8204 21.3757 13.9808 20.9872 13.9794 20.5902C13.9779 20.1903 13.8226 19.8149 13.5395 19.5322C13.2601 19.2528 12.873 19.0924 12.4775 19.0924C12.0751 19.0931 11.699 19.2491 11.4159 19.5322C11.1332 19.8149 10.9768 20.1903 10.9761 20.5902C10.9746 20.9872 11.1354 21.3757 11.4159 21.6562C11.699 21.9393 12.0758 22.0957 12.4761 22.0961H12.4775ZM20.2804 27.7632C19.6161 28.2085 18.8068 28.4539 18.0018 28.4539H17.948C17.0947 28.4429 16.2806 28.1719 15.5929 27.6698C15.4241 27.5468 15.2637 27.4098 15.1157 27.2626C14.9275 27.0751 14.7568 26.8685 14.6081 26.6484C14.4587 26.4272 14.3302 26.1907 14.2269 25.9453C14.0742 25.5828 13.9753 25.2004 13.9325 24.8082C13.9186 24.6852 13.9614 24.5643 14.0486 24.4764C14.1639 24.3604 14.3368 24.3457 14.4745 24.3457C14.5217 24.3457 14.5697 24.348 14.6165 24.3502C14.6292 24.3508 14.6418 24.3514 14.6543 24.3519C14.7089 24.3549 14.7609 24.3574 14.8092 24.3574H21.6746C21.7819 24.3574 21.8829 24.3995 21.9587 24.4757C22.0459 24.5636 22.088 24.6844 22.0748 24.8075C22.032 25.1997 21.9327 25.582 21.7804 25.9446C21.6768 26.1899 21.5486 26.4265 21.3995 26.6477C21.2516 26.8678 21.0798 27.0743 20.892 27.2618C20.7052 27.4479 20.499 27.6167 20.2804 27.7632Z" fill="#2C2C2C"/>\n</g>\n</g>\n</svg>\n'
  , lightDownArrow = '<svg width="56" height="56" viewBox="-0.15 -0.35 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">\n<path d="M3.5 5L6 7.5L8.5 5" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>\n</svg>\n';
function isFabIconUrl(e) {
    const t = e?.chatBubbleUrl || "svg";
    return t.startsWith("http://") || t.startsWith("https://") || t.startsWith("/")
}
function setBtnChatBg(e, t) {
    const s = t?.chatBubbleUrl || "svg"
      , n = isFabIconUrl(t);
    if (n) {
        const t = document.createElement("img");
        t.src = s,
        t.alt = "Push to talk",
        t.style.width = "100%",
        t.style.height = "100%",
        t.style.objectFit = "cover",
        1 === e.childElementCount && e.removeChild(e.children[0]),
        e.appendChild(t)
    } else
        e.innerHTML = "white" === getContrastingTextColor(t?.fabBg) ? lightChatBubble : darkChatBubble;
    return n
}
function fastBotInit() {
    const e = "CUSTOM_CHAT_WIDGET_FB_WELCOME_MESSAGE_SHOWN"
      , t = "CUSTOM_CHAT_WIDGET_FB_SOUND_PLAYED"
      , s = document.currentScript;
    setTimeout(() => {
        const 
        i = "https://app.fastbots.ai"
        , a = 'clyslg82q0003r9bcs6rag4ws'
        , o = document.createElement("style");
      o.innerHTML = "\n@keyframes zoom-in {\n  from {\n    opacity: 0;\n    transform: scale(0.5);\n  }\n\n  to {\n    opacity: 1;\n    transform: scale(1);\n  }\n}\n\n.chat-widget-zoom-in {\n  animation-name: zoom-in;\n  animation-duration: 0.4s;\n  animation-fill-mode: both;\n  transform-origin: center;\n  animation-timing-function: ease-in-out;\n}\n\n@keyframes pulse {\n  from {\n    transform: scale3d(1, 1, 1);\n  }\n\n  50% {\n    transform: scale3d(1.25, 1.25, 1.25);\n  }\n\n  to {\n    transform: scale3d(1, 1, 1);\n  }\n}\n\n.pulse {\n  animation-duration: 0.75s;\n  animation-name: pulse;\n  animation-timing-function: ease-in-out;\n}\n\n.hover-scale {\n  transition: transform 0.2s ease-in-out;\n}\n\n.hover-scale:hover {\n  transform: scale(1.048);\n}\n\n.iframe-hidden {\n  transform-origin: right bottom;\n  box-shadow: rgba(0, 0, 0, 0.16) 0px 5px 40px;\n  transition:\n    width 200ms ease 0s,\n    height 200ms ease 0s,\n    max-height 200ms ease 0s,\n    transform 200ms cubic-bezier(1, 0, 1, 0) 0s,\n    opacity 200ms ease-out 0s;\n  transform: scale(0);\n  opacity: 0;\n}\n\n.iframe-visible {\n  transform-origin: right bottom;\n  box-shadow: rgba(0, 0, 0, 0.16) 0px 5px 40px;\n  transition:\n    width 200ms ease 0s,\n    height 200ms ease 0s,\n    max-height 200ms ease 0s,\n    transform 300ms cubic-bezier(0, 1.2, 1, 1) 0s,\n    opacity 83ms ease-out 0s;\n  transform: scale(1);\n  opacity: 1;\n}\n",
      document.head.appendChild(o),
      async function() {
          const n = await fetch(`${i}/api/public/widget-config/${a}`)
            , o = await n.json()
            , l = function(e) {
              const t = document.createElement("button");
              return t.setAttribute("id", "chat-widget-push-to-talk"),
              setBtnChatBg(t, e),
              t.style.position = "fixed",
              t.style.bottom = "20px",
              t.style.zIndex = "2147483647",
              t.style.width = "58px",
              t.style.height = "58px",
              t.style.borderRadius = "50%",
              t.style.border = "none",
              t.style.backgroundColor = e.fabBg,
              t.style.padding = "0",
              t.style.cursor = "pointer",
              t.style.visibility = "hidden",
              t.style.fontSize = "20px",
              t.style.boxShadow = "rgba(0, 0, 0, 0.4) 5px 5px 15px -3px, rgba(0, 0, 0, 0.2) 5px 5px 6px -4px",
              t.style.overflow = "hidden",
              "left" === e?.chatBubblePosition ? t.style.left = "20px" : t.style.right = "20px",
              t
          }(o)
            , r = function() {
              const 
                n = 'clyslg82q0003r9bcs6rag4ws'
                , i = new URL(`https://app.fastbots.ai/embed/${n}`)
                , a = document.createElement("iframe");
              return a.src = i.toString(),
              a.style.position = "fixed",
              a.style.bottom = "90px",
              a.style.height = "820px",
              a.style.maxHeight = "84dvh",
              a.style.zIndex = "2147483647",
              a.style.borderRadius = "12px",
              a.style.border = "1px solid #e5e7eb",
              a.style.boxShadow = "rgba(0, 0, 0, 0.2) 5px 5px 25px -5px, rgba(0, 0, 0, 0.1) 0px 8px 10px -6px",
              a
          }()
            , m = function(e) {
              const t = document.createElement("div");
              return t.style.backgroundColor = "white",
              t.style.color = "black",
              t.style.boxShadow = "rgba(111, 111, 111, 0.2) 0px 10px 30px 0px, rgba(96, 96, 96, 0.2) 0px 0px 0px 1px",
              t.style.borderRadius = "10px",
              t.style.padding = "20px",
              t.style.margin = "8px",
              t.style.fontSize = "14px",
              t.style.opacity = "0",
              t.style.transform = "scale(1)",
              t.style.transition = "opacity 0.5s ease 0s, transform 0.5s ease 0s",
              t.style.position = "fixed",
              t.style.bottom = "90px",
              t.style.cursor = "pointer",
              t.id = "welcomeMessages",
              t.style.zIndex = "2147483647",
              t.style.maxWidth = "400px",
              t.dir = "auto",
              "left" === e?.chatBubblePosition ? t.style.left = "20px" : t.style.right = "20px",
              t.style.fontFamily = '"Segoe UI", "Segoe UI Emoji", system-ui, -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif',
              t.innerText = e.welcome,
              t
          }(o)
            , d = function(e) {
              const t = document.createElement("div");
              return t.style.backgroundColor = "#e1e1e1",
              t.style.width = "10px",
              t.style.height = "10px",
              t.style.color = "black",
              t.style.boxShadow = "rgba(111, 111, 111, 0.2) 0px 10px 30px 0px, rgba(96, 96, 96, 0.2) 0px 0px 0px 1px",
              t.style.borderRadius = "9999px",
              t.style.padding = "6px",
              t.style.margin = "8px",
              t.style.fontSize = "12px",
              t.style.transform = "scale(1)",
              t.style.transition = "opacity 0.5s ease 0s, transform 0.5s ease 0s",
              t.style.position = "fixed",
              t.style.top = "-15px",
              t.style.display = "flex",
              t.style.justifyContent = "center",
              t.style.alignItems = "center",
              t.style.fontWeight = "500",
              t.style.border = "1px solid #d7d7d7",
              t.style.cursor = "pointer",
              t.id = "welcomeMessagesCross",
              t.style.zIndex = "2147483647",
              "left" === e?.chatBubblePosition ? t.style.left = "-13px" : t.style.right = "-13px",
              t.style.fontFamily = '"Segoe UI", "Segoe UI Emoji", system-ui, -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif',
              t.innerText = "X",
              t
          }(o);
          function c() {
              h.matches ? ("left" === o.chatBubblePosition && a ? r.style.left = "20px" : r.style.right = "20px",
              r.style.width = "440px",
              r.style.maxWidth = "100dvw") : (r.style.height = "100dvh",
              r.style.bottom = "0px",
              r.style.width = "100dvw",
              r.style.right = "0px",
              r.style.maxHeight = "100dvh")
          }
          document.body.appendChild(l),
          document.body.appendChild(r),
          r.classList.add("iframe-hidden"),
          r.src += (r.src.includes("?") ? "&" : "?") + `host=${window.location.hostname}`,
          r.src += (r.src.includes("?") ? "&" : "?") + "embed=true";
          const h = window.matchMedia("(min-width: 768px)");
          function p(e) {
              "open" === e ? (r.classList.remove("iframe-hidden"),
              r.classList.add("iframe-visible"),
              l.innerHTML = "white" === getContrastingTextColor(o?.fabBg) ? lightDownArrow : lightDownArrow?.replace('stroke="white"', 'stroke="#2c2c2c"')) : "close" === e && (r.classList.remove("iframe-visible"),
              r.classList.add("iframe-hidden"),
              isFabIconUrl(o) ? setBtnChatBg(l, o) : l.innerHTML = "white" === getContrastingTextColor(o?.fabBg) ? lightChatBubble : darkChatBubble)
          }
          h.addEventListener("change", c),
          c();
          let g = !1;
          l.addEventListener("click", (function() {
              p(g ? "close" : "open"),
              document.getElementById("welcomeMessages") && document.body.removeChild(m),
              document.getElementById("welcomeMessagesCross") && m.removeChild(d),
              g = !g
          }
          )),
          r.onload = () => {
              const s = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || window.innerWidth <= 512
                , n = !0 === o.welcomeMessagePopup?.isVisibleOnMobile
                , i = ("number" == typeof o.welcomeMessageTimeout ? !(o.welcomeMessageTimeout < 0) && (o.welcomeMessageTimeout > 0 || o.welcomeMessagePopup?.enabled) : o.welcomeMessagePopup?.enabled) && (!s || s && n);
              l.classList.add("chat-widget-zoom-in"),
              setTimeout(( () => {
                  l.classList.remove("chat-widget-zoom-in"),
                  l.classList.add("hover-scale")
              }
              ), 2e3);
              const a = sessionStorage.getItem(t)
                , r = setInterval((function() {
                  const e = sessionStorage.getItem(t);
                  if (o?.widgetSound && !e && "none" !== o?.widgetSound) {
                      new Audio(o?.widgetSound).play().then(( () => {
                          l.classList.add("pulse");
                          try {
                              clearInterval(r)
                          } catch (e) {
                              console.log(e)
                          }
                          sessionStorage.setItem(t, !0)
                      }
                      )).catch(( () => {}
                      ))
                  }
              }
              ), 500);
              a && clearInterval(r),
              l.style.visibility = "visible";
              const c = sessionStorage.getItem(e);
              if (i && !c) {
                  document.body.append(m),
                  m.appendChild(d);
                  setTimeout(( () => {
                      m.style.opacity = "1",
                      m.addEventListener("click", (function() {
                          sessionStorage.setItem(e, !0),
                          document.body.removeChild(m),
                          m.removeChild(d),
                          p("open")
                      }
                      )),
                      document.addEventListener("mousemove", (function(e) {
                          const t = function(e, t) {
                              const s = e.getBoundingClientRect()
                                , n = t.getBoundingClientRect();
                              return {
                                  top: Math.min(s.top, n.top),
                                  right: Math.max(s.right, n.right),
                                  bottom: Math.max(s.bottom, n.bottom),
                                  left: Math.min(s.left, n.left)
                              }
                          }(m, d);
                          !function(e, t, s) {
                              return e >= s.left && e <= s.right && t >= s.top && t <= s.bottom
                          }(e.clientX, e.clientY, t) ? d.style.opacity = "0" : d.style.opacity = "1"
                      }
                      )),
                      m.addEventListener("mouseenter", (function() {
                          d.style.opacity = "1"
                      }
                      )),
                      d.addEventListener("mouseenter", (function() {
                          d.style.opacity = "1"
                      }
                      )),
                      d.addEventListener("click", (function() {
                          sessionStorage.setItem(e, !0),
                          document.body.removeChild(m),
                          m.removeChild(d)
                      }
                      ))
                  }
                  ), 1e3 * parseInt(o?.welcomeMessageTimeout ?? o?.welcomeMessagePopup?.welcomeMessageTimeout) - 500)
              }
          }
          ,
          window.addEventListener("message", (e => {
              "CLOSE_CHAT" === e.data?.action && (p("close"),
              g = !1)
          }
          ))
      }()
      
    }, 5000);
}
fastBotInit();
