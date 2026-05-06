import type { SemTree } from 'semtree';

import { getCollection } from 'astro:content';
import path from 'path';
import * as semtree from 'semtree';


export async function buildBonsai(): Promise<SemTree | undefined> {
  // init vars
  const opts = {
    // 'false' means i.bonsai itself is the root; all top-level list items are its children.
    // 'true' would require exactly one top-level item in the file (the virtual root).
    virtualBranches: false,
    // semtree options: https://github.com/wikibonsai/semtree?tab=readme-ov-file#options
  };
  const bonsaiText: any = {}; // { filename: content } hash
  const rootFilename: string = 'i.bonsai';
  // build 'bonsaiText' hash
  const allIndexDocs = await getCollection('index');
  allIndexDocs.forEach((doc: any) => {
    bonsaiText[doc.id] = (doc.body ?? '').replace(/^\s+|\s+$/g, '');
  });
  let bonsai: SemTree | string = 'uninitialized bonsai';
  try {
    // build bonsai tree data struct
    bonsai = semtree.create(rootFilename, bonsaiText, opts);
    if (typeof bonsai === 'string') {
      throw new Error(bonsai);
    } else {
      // append url for template rendering and init fam metadata
      const allEntryDocs = await getCollection('entries');
      for (const node of bonsai.nodes) {
        const doc: any = allEntryDocs.find((doc) => path.basename(doc.id, '.md') == node.text);
        if (doc !== undefined) {
          node.url = '/entries/' + doc.id;
        }
      }
      // uncomment if 'virtualBranches' is set to 'false'
      // for (const node of bonsai.nodes) {
      //   const doc: any = allIndexDocs.find((doc) => path.basename(doc.id, '.md') == node.text);
      //   if (doc !== undefined) {
      //     node.url = '/index/' + doc.slug;
      //   }
      // }
      // uncomment in case blog posts are desired on the #tag map
      // const allBlogDocs = await getCollection('blog');
      // for (const node of bonsai.nodes) {
      //   const doc: any = allBlogDocs.find((doc) => path.basename(doc.id, '.md') == node.text);
      //   if (doc !== undefined) {
      //     node.url = '/blog/' + doc.slug;
      //   }
      // }
      return bonsai;
    }
  } catch (e) {
    console.error(e, bonsai);
  }
}

// Do not call buildBonsai() at module init — the content store isn't ready yet.
// Each component that needs the tree should call buildBonsai() directly.
