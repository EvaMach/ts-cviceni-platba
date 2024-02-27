var filterNonDigits = function (value) {
    return value.replace(/\D/g, '').slice(0, 16);
};
var insertDashes = function (input) {
    var result = '';
    for (var i = 0; i < input.length; i++) {
        if (i > 0 && i % 4 == 0) {
            result += '-';
        }
        result += input[i];
    }
    return result;
};
var inferCardType = function (input) {
    var firstTwoDigits = Number(input.slice(0, 2));
    var isVisa = input[0] === '4';
    var isMastercard = firstTwoDigits >= 51 && firstTwoDigits <= 55 || Number(input) >= 2221 && Number(input) <= 2720;
    var isAmex = firstTwoDigits === 34 || firstTwoDigits === 37;
    var isDiscover = firstTwoDigits === 65 || Number(input) >= 644 && Number(input) <= 649 || Number(input) === 6011;
    var isDiners = firstTwoDigits === 36 || firstTwoDigits === 55;
    if (isVisa) {
        return 'visa';
    }
    else if (isMastercard) {
        return 'mastercard';
    }
    else if (isAmex) {
        return 'amex';
    }
    else if (isDiscover) {
        return 'discover';
    }
    else if (isDiners) {
        return 'diners';
    }
    return 'unknown';
};
var cardInput = document.querySelector('.card-input');
cardInput.addEventListener('input', function (event) {
    var input = event.target;
    var digitsOnly = filterNonDigits(input.value);
    var digitsWithDashes = insertDashes(digitsOnly);
    input.value = digitsWithDashes;
    var cardImages = document.querySelectorAll('.card-icon');
    var matchingCard = inferCardType(digitsOnly.slice(0, 4));
    cardImages.forEach(function (cardImage) {
        var isMatchingCard = cardImage.classList.contains("icon-".concat(matchingCard));
        if (!isMatchingCard) {
            cardImage.classList.remove('active');
        }
        else {
            cardImage.classList.add('active');
        }
    });
});
