"use strict";
(self["webpackChunkstrapi_backend"] = self["webpackChunkstrapi_backend"] || []).push([[2246],{

/***/ 50345:
/***/ ((module) => {

module.exports = JSON.parse('{"attribute.boolean":"Boolean","attribute.boolean.description":"Ja eller nej, 1 eller 0, sand eller falsk","attribute.component":"Komponent","attribute.component.description":"Gruppe af felter som kan gentages","attribute.date":"Dato","attribute.date.description":"En datovælger med timer, minutter og sekunder","attribute.datetime":"Dato - tid","attribute.dynamiczone":"Dynamisk zone","attribute.dynamiczone.description":"Dynamisk udvælg komponenter ved redigering af indhold","attribute.email":"E-mail","attribute.email.description":"E-mail felt med valideringsformat","attribute.enumeration":"Enumeration","attribute.enumeration.description":"Liste med værdier, vælg én","attribute.json":"JSON","attribute.json.description":"Data i JSON format","attribute.media":"Medie","attribute.media.description":"Filer som billeder, videoer, osv...","attribute.null":" ","attribute.number":"Tal","attribute.number.description":"Tal (hele tal, kommatal)","attribute.password":"Kodeord","attribute.password.description":"Kodeord med kryptering","attribute.relation":"Relation","attribute.relation.description":"Reference til en dokument type","attribute.richtext":"RTE","attribute.richtext.description":"En rich-text-editor med formateringsmuligheder","attribute.text":"Tekst","attribute.text.description":"Korte eller lange tekster som titel eller beskrivelse","attribute.time":"Tid","attribute.timestamp":"Tidsstempel","attribute.uid":"UID","attribute.uid.description":"Unikt ID","button.attributes.add.another":"Tilføj et felt","button.component.add":"Tilføj et komponent","button.component.create":"Opret komponent","button.model.create":"Opret dokument type","button.single-types.create":"Opret enkelt type","component.repeatable":"(gentageligt)","components.SelectComponents.displayed-value":"{number, plural, =0 {# komponenter} one {# komponent} other {# komponenter}} valgt","components.componentSelect.no-component-available":"Du har allerede tilføjet alle dine komponenter","components.componentSelect.no-component-available.with-search":"Der er ingen komponenter som matcher din søgning","components.componentSelect.value-component":"{number} komponent valgt (skriv for at søge efter komponenter)","components.componentSelect.value-components":"{number} komponenter valgt","configurations":"konfigurationer","contentType.apiId-plural.description":"API ID i flertal","contentType.apiId-plural.label":"API ID (flertal)","contentType.apiId-singular.description":"UID bliver brugt til at generere API routes og database tabeller/kollektion","contentType.apiId-singular.label":"API ID (ental)","contentType.collectionName.description":"Brugbar når navnet på din indholdstype og dit tabel navn er forskellige","contentType.collectionName.label":"Dokument navn","contentType.displayName.label":"Visningsnavn","contentType.draftAndPublish.description":"Opret en version som udkast for hvert element inden det offentliggøres","contentType.draftAndPublish.label":"Udkast/offentliggør system","contentType.kind.change.warning":"Du har lige ændret typen af en indholdstype: API bliver nustillet (ruter, controllere, og services bliver overskrevet).","error.attributeName.reserved-name":"Dette navn kan ikke bruges i din indholdstype, da det måske kan ødelægge andre funktioner","error.contentType.pluralName-used":"Denne værdi kan ikke være den samme som ved ental","error.contentType.singularName-used":"Denne værdi kan ikke være den samme som ved flertal","error.contentTypeName.reserved-name":"Dette navn kan ikke bruges i dit projekt, da det måske kan ødelægge andre funktioner","error.validation.enum-duplicate":"Duplikat værdi er ikke tilladt","error.validation.enum-empty-string":"Tomme strenge er ikke tilladt","error.validation.minSupMax":"Må ikke overstige","error.validation.positive":"Skal være et positivt tal","error.validation.regex":"Regex mønster er ikke gyldig","error.validation.relation.targetAttribute-taken":"Dette navn eksisterer allerede","form.attribute.component.option.add":"Tilføj et komponent","form.attribute.component.option.create":"Opret et komponent","form.attribute.component.option.create.description":"Et komponent er delt mellem typer og komponenter, det bliver tilgængeligt fra alle steder.","form.attribute.component.option.repeatable":"Gentageligt komponent","form.attribute.component.option.repeatable.description":"Bedst til gentagne værdier af f.eks. ingredienser, meta tags, osv...","form.attribute.component.option.reuse-existing":"Brug et eksisterende komponent","form.attribute.component.option.reuse-existing.description":"Genbrug en komponent der allerede er oprettet for at holde din data konsistent gennem indholdstyper.","form.attribute.component.option.single":"Enkelt komponent","form.attribute.component.option.single.description":"Bedst til at gruppere felter som fulde adresse, primær information osv...","form.attribute.item.customColumnName":"Specielle kolonne navne","form.attribute.item.customColumnName.description":"Dette er brugbart til at omdøbe database kolonne navne i et mere omfattende format til API svar","form.attribute.item.defineRelation.fieldName":"Felt navn","form.attribute.item.enumeration.graphql":"Navn overskrivning til GraphQL","form.attribute.item.enumeration.graphql.description":"Tillader dig at overskrive standard genereret navn til GraphQL","form.attribute.item.enumeration.placeholder":"F.eks.\\nmorgen\\nmiddag\\naften","form.attribute.item.enumeration.rules":"Værdier (én linje pr. værdi)","form.attribute.item.maximum":"Maks værdi","form.attribute.item.maximumLength":"Maks længde","form.attribute.item.minimum":"Minimum værdi","form.attribute.item.minimumLength":"Minimum længde","form.attribute.item.number.type":"Tal format","form.attribute.item.number.type.biginteger":"stort helt tal (f.eks. 123456789)","form.attribute.item.number.type.decimal":"decimal (f.eks. 2.22)","form.attribute.item.number.type.float":"float (f.eks. 3.33333333)","form.attribute.item.number.type.integer":"helt tal (f.eks. 10)","form.attribute.item.privateField":"Privat felt","form.attribute.item.privateField.description":"Dette flet bliver ikke vist i API svar","form.attribute.item.requiredField":"Påkrævet felt","form.attribute.item.requiredField.description":"Du kan ikke oprette et element hvis dette felt er tomt","form.attribute.item.text.regex":"RegExp mønster","form.attribute.item.text.regex.description":"Teksten til regular expression","form.attribute.item.uniqueField":"Unikt felt","form.attribute.item.uniqueField.description":"Du kan ikke oprette et element hvis der allerede findes et element med samme indhold","form.attribute.media.allowed-types":"Vælg tillade typer af medier","form.attribute.media.allowed-types.option-files":"Filer","form.attribute.media.allowed-types.option-images":"Billeder","form.attribute.media.allowed-types.option-videos":"Videoer","form.attribute.media.option.multiple":"Flere medier","form.attribute.media.option.multiple.description":"Best til gallerier, slideshows eller download af flere filer","form.attribute.media.option.single":"Enkelt medie","form.attribute.media.option.single.description":"Best til avatar, profil billeder eller cover","form.attribute.settings.default":"Standard værdi","form.attribute.text.option.long-text":"Lang tekst","form.attribute.text.option.long-text.description":"Bedst til beskrivelser, biografier. Præcis søgning er deaktiveret.","form.attribute.text.option.short-text":"Kort tekst","form.attribute.text.option.short-text.description":"Bedst til titler, navne, links (URL). Præcis søgning er aktiveret.","form.button.add-components-to-dynamiczone":"Tilføj komponenter til zonen","form.button.add-field":"Tilføj endnu et felt","form.button.add-first-field-to-created-component":"Tilføj det første felt til komponentet","form.button.add.field.to.collectionType":"Tilføj endnu et felt til dokument typen","form.button.add.field.to.component":"Tilføj endnu et felt til komponentet","form.button.add.field.to.contentType":"Tilføj endnu et felt til dokument typen","form.button.add.field.to.singleType":"Tilføj endnu et felt til enkelt typen","form.button.cancel":"Annuller","form.button.collection-type.description":"Bedst til Best for flere forkomster som artikler, produkter, kommentarer osv...","form.button.configure-component":"Konfigurér komponentet","form.button.configure-view":"Konfigurér visning","form.button.select-component":"Vælg et komponent","form.button.single-type.description":"Bedst til enkelte forekomster som \\"om os\\", forside osv...","from":"fra","listView.headerLayout.description":"Byg datastrukturen for dit indhold","modalForm.attribute.form.base.name.description":"Mellemrum er ikke tilladt i navnet","modalForm.attribute.form.base.name.placeholder":"f.eks. slug, seoUrl, canonicalUrl","modalForm.attribute.target-field":"Vedhæftet felt","modalForm.attributes.select-component":"Vælg et komponent","modalForm.attributes.select-components":"Vælg komponenterne","modalForm.collectionType.header-create":"Opret en dokumenttype","modalForm.component.header-create":"Opret et komponent","modalForm.components.create-component.category.label":"Vælg en kategori eller intast et navn for at oprette en ny","modalForm.components.icon.label":"Ikon","modalForm.editCategory.base.name.description":"Mellemrum er ikke tilladt i kategori navnet","modalForm.header-edit":"Redigér {name}","modalForm.header.categories":"Kategorier","modalForm.header.back":"Tilbage","modalForm.singleType.header-create":"Opret en enkelt type","modalForm.sub-header.addComponentToDynamicZone":"Tilføj komponent til den dymaiske zone","modalForm.sub-header.attribute.create":"Tilføj {type} felt","modalForm.sub-header.attribute.create.step":"Tilføj komponent ({step}/2)","modalForm.sub-header.attribute.edit":"Redigér {name}","modalForm.sub-header.chooseAttribute.collectionType":"Vælg et felt til din dokument type","modalForm.sub-header.chooseAttribute.component":"Vælg et felt til dit komponent","modalForm.sub-header.chooseAttribute.singleType":"Vælg et felt til din enkelt type","modelPage.attribute.relation-polymorphic":"Relation (polymorphic)","modelPage.attribute.relationWith":"Relation med","notification.info.autoreaload-disable":"AutoReload funktionen er påkrævet for at bruge dette plugin. Start din server med `strapi develop`","notification.info.creating.notSaved":"Gem venligst dit arbejde inden du opretter en dokument type eller komponent","plugin.description.long":"Modellér data strukturen i dit API. Opret felter og relationer på få minutter. Filerne bliver automatisk oprettet og opdateret i dit projekt.","plugin.description.short":"Modellér data strukturen i dit API.","plugin.name":"Dokumenttype bygger","popUpForm.navContainer.advanced":"Avancerede indstillinger","popUpForm.navContainer.base":"Standard indstillinger","popUpWarning.bodyMessage.cancel-modifications":"Er du sikker på at du vil annullere dine ændringer?","popUpWarning.bodyMessage.cancel-modifications.with-components":"Er du sikker på at du vil annullere dine ændringer? Nogle komponenter er blevet oprettet eller redigeret...","popUpWarning.bodyMessage.category.delete":"Er du sikker på at du vil slette denne kategori? Alle komponenterne bliver også slettet.","popUpWarning.bodyMessage.component.delete":"Er du sikker på at du vil slette denne komponent?","popUpWarning.bodyMessage.contentType.delete":"Er du sikker på at du vil slette denne dokument type?","popUpWarning.draft-publish.button.confirm":"Ja, deaktivér","popUpWarning.draft-publish.message":"Hvis du deaktiverer udkast/offentliggør systemet, bliver dine udkast slettet.","popUpWarning.draft-publish.second-message":"Er du sikker på at du vil deaktivere det?","prompt.unsaved":"Er du sikker på at du vil stoppe? Alle dine ændringer går tabt.","relation.attributeName.placeholder":"F.eks. forfatter, kategori, tag","relation.manyToMany":"har og tilhører flere","relation.manyToOne":"har flere","relation.manyWay":"har flere","relation.oneToMany":"tilhører flere","relation.oneToOne":"har og tilhører én","relation.oneWay":"har én","table.button.no-fields":"Tilføj nyt felt","table.content.create-first-content-type":"Opret din først dokumenttype","table.content.no-fields.collection-type":"Tilføj dit første felt til denne dokumenttype","table.content.no-fields.component":"Tilføj dit første felt til dette komponent"}');

/***/ })

}]);