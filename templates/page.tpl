
<% pages.forEach(function(item){ %>
  export const <%= item.name %> = function () {
    // @ts-ignore
    return import(/* webpackChunkName: "<%= item.name %>" */ '..<%= item.src %>')
  }
<% }); %>