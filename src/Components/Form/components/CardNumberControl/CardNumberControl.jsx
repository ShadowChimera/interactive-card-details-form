import { useRef } from 'react'
import style from './CardNumberControl.module.scss'

import FormControl from '../FormControl/FormControl'

function CardNumberControl({
  label = 'Card Number',
  name = 'cardNumber',
  id = 'cardNumberInput',
  placeholder = 'e.g. 1234 5678 9123 0000',
  value,
  dispatch,
  ...formControlProps
}) {
  const inputRef = useRef(null)
  const inputSelectRangeRef = useRef(null)

  function handleInputChange() {
    const [validatedValue, caretPos] =
      getValidatedCardValue(
        inputRef.current.value,
        value,
        inputSelectRangeRef.current,
        inputRef.current.selectionStart
      )

    inputRef.current.value = validatedValue
    inputRef.current.setSelectionRange(caretPos, caretPos)

    dispatch({
      type: 'changed_card_number',
      value: inputRef.current.value,
    })
  }

  function handleSelectText() {
    const input = inputRef.current

    if (value !== input.value) {
      return
    }

    inputSelectRangeRef.current = {
      start: input.selectionStart,
      end: input.selectionEnd,
    }
  }

  return (
    <FormControl
      ref={inputRef}
      label={label}
      name={name}
      id={id}
      placeholder={placeholder}
      value={value}
      onChange={handleInputChange}
      onSelect={handleSelectText}
      {...formControlProps}
    />
  )
}

export default CardNumberControl

const GROUPS_SEPARATOR = ' '
const GROUPS_COUNT = 4
const NUMBERS_IN_GROUP_COUNT = 4

function getValidatedCardValue(
  curValue,
  prevValue,
  selectionRange,
  currentCaretPosition
) {
  const cardNumberWithoutSeparators = curValue.replaceAll(
    GROUPS_SEPARATOR,
    ''
  )

  const isInputOverflowed =
    cardNumberWithoutSeparators.length >
    GROUPS_COUNT * NUMBERS_IN_GROUP_COUNT

  const hasInvalidCharacters = !Number.isInteger(
    Number(cardNumberWithoutSeparators)
  )

  if (isInputOverflowed || hasInvalidCharacters) {
    return [prevValue, selectionRange.end]
  }

  const wasChangedOneCharacter =
    selectionRange.start === selectionRange.end

  const wasDeletedOneCharacter =
    wasChangedOneCharacter &&
    curValue.length < prevValue.length

  if (wasDeletedOneCharacter) {
    const prevValueSeparatorsIndexes = getIndexesOf(
      prevValue,
      GROUPS_SEPARATOR
    )
    const curValueSeparatorsIndexes = getIndexesOf(
      curValue,
      GROUPS_SEPARATOR
    )

    const wasSeparatorDeleted =
      prevValueSeparatorsIndexes.length >
      curValueSeparatorsIndexes.length

    if (wasSeparatorDeleted) {
      // eslint-disable-next-line no-extra-semi
      ;[curValue, currentCaretPosition] =
        processSeparatorDeletion(
          curValue,
          selectionRange.start,
          currentCaretPosition
        )
    }
  }

  return processCardNumber(curValue, currentCaretPosition)
}

function processSeparatorDeletion(
  value,
  caretPosBeforeDeleting,
  curCaretPos
) {
  const wasBackspaced = caretPosBeforeDeleting > curCaretPos

  if (wasBackspaced) {
    return [
      value.slice(0, curCaretPos - 1) +
        value.slice(curCaretPos),
      curCaretPos - 1,
    ]
  }

  return [
    value.slice(0, curCaretPos) +
      value.slice(curCaretPos + 1),
    curCaretPos,
  ]
}

function processCardNumber(cardNumber, caretPos) {
  let processedCardNumber = ''
  let newCaretPos = caretPos

  let groupIndex = 0
  let numberInGroupIndex = 0

  for (let i = 0; ; i++) {
    if (i === caretPos) {
      newCaretPos = processedCardNumber.length
    }

    if (i >= cardNumber.length) {
      break
    }

    if (!isDigit(cardNumber[i])) {
      continue
    }

    processedCardNumber += cardNumber[i]
    numberInGroupIndex += 1

    if (numberInGroupIndex >= NUMBERS_IN_GROUP_COUNT) {
      groupIndex += 1
      numberInGroupIndex = 0

      if (groupIndex >= GROUPS_COUNT) {
        break
      }

      processedCardNumber += GROUPS_SEPARATOR
    }
  }

  return [processedCardNumber, newCaretPos]
}

/* -------------------------------------------------------------------------- */
/*                                    utils                                   */
/* -------------------------------------------------------------------------- */

function isDigit(character) {
  return /^\d$/.test(character)
}

function getIndexesOf(string, substring) {
  let indexes = []
  let lastIndex = -1

  while (
    (lastIndex = string.indexOf(
      substring,
      lastIndex + 1
    )) !== -1
  ) {
    indexes.push(lastIndex)
  }

  return indexes
}
