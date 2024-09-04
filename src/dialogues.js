const dialogues = [
    { role: 'Kundenberaterin', name: 'Melanie Sperling', phrase: 'Wie kann ich Ihnen weiterhelfen?', action: null },
    { role: 'Kunde', name: 'Max Mustermann', phrase: 'Ich habe mich letztes Wochenende mit meinem Nachbarn unterhalten und er meinte ich soll einen Pflegeantrag stellen.', action: 'showPopup' },
    { role: 'Kundenberaterin', name: 'Melanie Sperling', phrase: 'Haben Sie bereits einen Pflegegrad?', action: null },
    { role: 'Kunde', name: 'Max Mustermann', phrase: 'Nein, den habe ich noch nicht.', action: 'tickErstantrag' },
    { role: 'Kundenberaterin', name: 'Melanie Sperling', phrase: 'Ihre Versicherungsdaten sind noch korrekt, oder?', action: null },
    { role: 'Kunde', name: 'Max Mustermann', phrase: 'Ja, genau, da hat sich nichts geändert.', action: null },
    { role: 'Kundenberaterin', name: 'Melanie Sperling', phrase: 'Haben Sie einen Bevollmächtigten oder Betreuer?', action: null },
    { role: 'Kunde', name: 'Max Mustermann', phrase: 'Ja, mein Sohn Matthias. Der sollte im System hinterlegt sein.', action: 'fillBevollmächtigter' },
    { role: 'Kundenberaterin', name: 'Melanie Sperling', phrase: 'Ab Pflegegrad 2 haben Sie Anspruch auf Pflegegeld oder Pflegesachleistungen. Benötigen Sie die Hilfe eines Pflegedienstes?', action: null },
    { role: 'Kunde', name: 'Max Mustermann', phrase: 'Nein, ich bekomme alles noch selbstständig hin.', action: 'tickPflegegeld' },
    { role: 'Kundenberaterin', name: 'Melanie Sperling', phrase: 'Ist Ihre Bankverbindung noch aktuell?', action: null },
    { role: 'Kunde', name: 'Max Mustermann', phrase: 'Ja, die Bankverbindung hat sich nicht geändert.', action: null },
    { role: 'Kundenberaterin', name: 'Melanie Sperling', phrase: 'Der Antrag ist vollständig und wird an den Medizinischen Dienst übergeben.', action: 'submitAntrag' },
  ];
  
  export default dialogues;
  