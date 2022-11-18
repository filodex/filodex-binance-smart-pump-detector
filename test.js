let banned = ['BTC', 'LTC', 'USD']

if (banned.indexOf('USDd') >= 0) {
    console.log('its in banned')
} else {
    console.log('not in')
}

banned.splice(0, 1)

console.log(banned)
