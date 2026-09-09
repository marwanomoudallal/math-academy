// Make the first-time guide prefer natural neural/online voices when the device provides them.
(function () {
  if (!('speechSynthesis' in window) || !window.SpeechSynthesisUtterance) return;
  const nativeSpeak = speechSynthesis.speak.bind(speechSynthesis);
  const feminine = /female|woman|zira|susan|samantha|victoria|hazel|aria|ava|allison|serena|salli|joanna|kendra|kimberly|ivy|emma|olivia|linda|heera|kalpana|jenny|sara/i;
  const masculine = /male|man|david|mark|james|daniel|alex|george|guy|thomas|brian|fred|ryan|liam/i;
  const natural = /neural|natural|online|premium|enhanced|google|siri|microsoft/i;

  function chooseVoice(utterance) {
    const language = String(utterance.lang || 'en').toLowerCase().slice(0, 2);
    const voices = speechSynthesis.getVoices().filter(voice => voice.lang.toLowerCase().startsWith(language));
    if (!voices.length) return null;
    const girl = window.Player?.data?.gender === 'girl';
    const preferredGender = girl ? feminine : masculine;
    const otherGender = girl ? masculine : feminine;
    return voices.slice().sort((a, b) => {
      const score = voice => (natural.test(voice.name) ? 5 : 0) + (preferredGender.test(voice.name) ? 4 : 0) - (otherGender.test(voice.name) ? 4 : 0) + (voice.localService ? 0 : 1);
      return score(b) - score(a);
    })[0];
  }

  speechSynthesis.speak = function (utterance) {
    if (utterance && utterance.lang && /^(en|fr|ar)-/i.test(utterance.lang)) {
      const voice = chooseVoice(utterance);
      if (voice) utterance.voice = voice;
      utterance.rate = window.Player?.data?.gender === 'girl' ? 0.94 : 0.91;
      utterance.pitch = window.Player?.data?.gender === 'girl' ? 1.08 : 0.97;
      utterance.volume = 0.98;
      utterance.text = String(utterance.text || '').replace(/\s+/g, ' ').trim();
    }
    return nativeSpeak(utterance);
  };
})();
