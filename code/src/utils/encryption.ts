import md5 from "md5";

export default {
	hashMd5: (payload: any) => md5(payload),
};
