import {test} from '@playwright/test';
import {galata} from '@jupyterlab/galata';

const tmpPath = 'test-performance-open';
const codeNotebook = 'large_code_notebook.ipynb';
const mdNotebook = 'large_md_notebook.ipynb';
const textFile = 'lorem_ipsum.txt';

// Generate the files for the benchmark
test('create content',async ({ request }) => {
    const content = galata.newContentsHelper(request);
    const codeContent = galata.Notebook.generateNotebook(300, 'code', [
        'for x in range(OUTPUT_LENGTH):\n',
        '    print(f"{PREFIX} {x}")'
    ]);

    await content.uploadContent(
        JSON.stringify(codeContent),
        'text',
        `${tmpPath}/${codeNotebook}`
    );

    const mdContent = galata.Notebook.generateNotebook(300, 'markdown', [
        '# Demonstration of proper behaviour with non-LaTeX uses of `$`\n',
        '\n',
        '## This should be highlighted as a heading\n',
        '\n',
        'Sample code:\n',
        '\n',
        '    ```\n',
        '    echo $HOME\n',
        '    ```\n',
        '\n',
        '```shell\n',
        'echo $HOME\n',
        '```\n',
        '\n',
        'The code block below should be properly highlighted:\n',
        '\n',
        '```bash\n',
        'echo $HOME\n',
        '```\n',
        '\n',
        '\n',
        '### Heading\n',
        '\n',
        '`$test`\n',
        '\n',
        '### This heading should be highlighted too'
    ]);

    await content.uploadContent(
        JSON.stringify(mdContent),
        'text',
        `${tmpPath}/${mdNotebook}`
    );

    const loremIpsum =
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin molestie suscipit libero non volutpat. Suspendisse et tincidunt metus. Proin laoreet magna rutrum egestas tristique. Proin vel neque sit amet lectus egestas pellentesque nec quis nisl. Quisque faucibus condimentum leo, quis euismod eros ultrices in. Vivamus maximus malesuada tempor. Aliquam maximus maximus elit, ac imperdiet tellus posuere nec. Sed at rutrum velit. Etiam et lectus convallis, sagittis nibh sit amet, gravida turpis. Nulla nec velit id est tristique iaculis.\n\nDonec vel finibus mauris, eu tristique justo. Pellentesque turpis lorem, lobortis eu tincidunt non, cursus sit amet ex. Vivamus eget ligula a leo vulputate egestas a eu felis. Donec sollicitudin maximus neque quis condimentum. Cras vestibulum nulla libero, sed semper velit faucibus ac. Phasellus et consequat risus. Sed suscipit ligula est. Etiam ultricies ac lacus sit amet cursus. Nam non leo vehicula, iaculis eros eu, consequat sapien. Ut quis odio quis augue pharetra porttitor sit amet eget nisl. Vestibulum magna eros, rutrum ac nisi non, lobortis varius ipsum. Proin luctus euismod arcu eget sollicitudin. Praesent nec erat gravida, tincidunt diam eget, tempor tortor.';
    await content.uploadContent(loremIpsum, 'text', `${tmpPath}/${textFile}`);
});