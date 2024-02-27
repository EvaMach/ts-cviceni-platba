const filterNonDigits = (value: string): string => {
  return value.replace(/\D/g, '').slice(0, 16);
};

const insertDashes = (input: string): string => {
  let result = '';
  for (let i = 0; i < input.length; i++) {
    if (i > 0 && i % 4 == 0) {
      result += '-';
    }
    result += input[i];
  }
  return result;
};

const inferCardType = (input: string): 'visa' | 'mastercard' | 'amex' | 'discover' | 'diners' | 'unknown' => {
  const firstTwoDigits: number = Number(input.slice(0, 2));
  const isVisa = input[0] === '4';
  const isMastercard = firstTwoDigits >= 51 && firstTwoDigits <= 55 || Number(input) >= 2221 && Number(input) <= 2720;
  const isAmex = firstTwoDigits === 34 || firstTwoDigits === 37;
  const isDiscover = firstTwoDigits === 65 || Number(input) >= 644 && Number(input) <= 649 || Number(input) === 6011;
  const isDiners = firstTwoDigits === 36 || firstTwoDigits === 55;
  if (isVisa) {
    return 'visa';
  } else if (isMastercard) {
    return 'mastercard';
  } else if (isAmex) {
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

const cardInput: HTMLInputElement = document.querySelector('.card-input');

cardInput.addEventListener('input', (event: Event): void => {
  const input = event.target as HTMLInputElement;
  const digitsOnly = filterNonDigits(input.value);
  const digitsWithDashes = insertDashes(digitsOnly);
  input.value = digitsWithDashes;

  const cardImages = document.querySelectorAll('.card-icon');
  const firstFourDigits = digitsOnly.slice(0, 4);
  const matchingCard = inferCardType(firstFourDigits);

  cardImages.forEach(cardImage => {
    const isMatchingCard: boolean = cardImage.classList.contains(`icon-${matchingCard}`);
    if (!isMatchingCard) {
      cardImage.classList.remove('active');
    } else {
      cardImage.classList.add('active');
    }

    // Případně pro fajnšmekry by šla místo podmínky použít metoda toggle
    // cardImage.classList.toggle('active', isMatchingCard);
  });
});

