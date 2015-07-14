'use strict';

var Bold = require('../../src/js/markdownCommands/bold'),
    MarkdownEditor = require('../../src/js/markdownEditor'),
    EventManager = require('../../src/js/eventManager');

describe('Bold', function() {
    var cm,
        doc,
        mde;

    beforeEach(function() {
        var $container = $('<div />'),
            sourceText;

        $('body').append($container);

        mde = new MarkdownEditor($container, new EventManager());

        mde.init();

        cm = mde.getEditor();

        sourceText = ['mytext1', '', 'mytext2', 'mytext3'];

        cm.setValue(sourceText.join('\n'));
        doc = cm.getDoc();
    });

    afterEach(function() {
        $('body').empty();
    });

    describe('특정라인에서 커맨드실행시 해당위치에 볼드문법이 추가된다', function() {
        it('텍스트 중간에서 실행시 ****가 삽입된다 ', function() {
            doc.setCursor(2, 3);

            Bold.exec(mde);

            expect(cm.getValue()).toEqual(['mytext1', '', 'myt****ext2', 'mytext3'].join('\n'));
        });

        it('빈 라인시작에 ****가 추가되었다', function() {
            doc.setCursor(1, 3);

            Bold.exec(mde);

            expect(cm.getValue()).toEqual(['mytext1', '****', 'mytext2', 'mytext3'].join('\n'));
        });
    });

    describe('셀렉션을 지정한상태에서 커맨드를 사용하면 해당 텍스트가 볼드 문법으로 감싸진다.', function() {
        it('선택된영역의 텍스트가 볼드처리된다', function() {
            doc.setSelection({line: 0, ch: 0}, {line: 0, ch: 7});

            Bold.exec(mde);

            expect(cm.getValue()).toEqual(['**mytext1**', '', 'mytext2', 'mytext3'].join('\n'));
        });
    });
});
